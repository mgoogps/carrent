using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mgoo.CarRent.Interface;
using Mgoo.CarRent.Models.Parameter;
using Mgoo.CarRent.Common;
using Mgoo.CarRent.DAL;
using Mgoo.CarRent.Models.Return;
using EntityFramework.Extensions;

namespace Mgoo.CarRent.BLL.MessageManager
{
   public class Message:LoginUser
    { 

        /// <summary>
        /// 获取报警消息列表
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> GetMessageList(P_Message.P_GetMessageList arg)
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new CarRentEntities())
                    {
                       var query = from m in db.ExceptionMessage
                                    join d in db.Devices 
                                    on m.DeviceID equals d.DeviceID 
                                    join u in db.Users
                                    on d.UserID equals u.UserID
                                    where m.Deleted == 0
                                    select new R_Message.GetMessageListPage_Result.GetMessageListPage_List
                                    {
                                        Created = m.Created ?? default(DateTime),
                                        DeviceName = d.DeviceName,
                                        UserID = u.UserID,
                                        UserName = u.UserName,
                                        ExceptionID = m.ExceptionID,
                                        PhoneNum = d.PhoneNum,
                                        Message = m.Message,
                                        SerialNumber = d.SerialNumber
                                    };
                        if (arg.userid != null)
                        {
                            query = query.Where(q => q.UserID==arg.userid);
                        }
                        if (arg.start_date != null)
                        {
                            query = query.Where(q => q.Created >= arg.start_date);
                        }
                        if (arg.end_date != null)
                        {
                            query = query.Where(q => q.Created <= arg.end_date);
                        } 
                        if (!string.IsNullOrEmpty(arg.keyword))
                        { 
                            query = query.Where(q => q.DeviceName.Contains(arg.keyword) || q.SerialNumber.Contains(arg.keyword) || q.PhoneNum.Contains(arg.keyword));
                        }
                        int total = query.Count();

                        // p=1 , pagesize=20    (p - 1) * pagesize = 0 
                        var index = (arg.p - 1) * arg.pagesize;
                        query = query.OrderBy(p => p.Created).Skip(index).Take(arg.pagesize);
                        var list = query.ToList();
                        list.ForEach((s) => { s.RowIndex = ++index; });                
                        ar.message = $"查询到{total}条数据.";
                        ar.result = new {
                            list = list,
                            pages = total % arg.pagesize == 0 ? total / arg.pagesize : total / arg.pagesize + 1,
                           // pages = Math.Ceiling(Convert.ToDecimal(total / arg.pagesize)),
                            total = total
                        };
                    }
                }
                catch (Exception ex)
                {
                    Log.Error(this, ex);
                    ar.code = StatusCode.error;
                    ar.message = ex.Message;
                }
                return ar;
            });
        }
        /// <summary>
        /// 查询今日一共多少条报警消息
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> GetMessageCount(P_Message.P_MessageCount arg)
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new CarRentEntities())
                    {
                        var query= from m in db.ExceptionMessage
                                   join d in db.Devices
                                   on m.DeviceID equals d.DeviceID
                                   join u in db.Users
                                   on d.UserID equals u.UserID
                                   where m.Deleted == 0 && m.Created>arg.start && m.Created<arg.end
                                   select new R_Message.GetMessageListPage_Result.GetMessageListPage_List
                                   {
                                       Created = m.Created ?? default(DateTime),
                                       DeviceName = d.DeviceName,
                                       UserID = u.UserID,
                                       UserName = u.UserName,
                                       ExceptionID = m.ExceptionID,
                                       PhoneNum = d.PhoneNum,
                                       Message = m.Message,
                                       SerialNumber = d.SerialNumber
                                   };
                        var count = query.Count();
                        ar.result = new
                        {
                           todaycount=count
                        };

                    }

                }
                catch (Exception ex)
                {
                    Log.Error(this, ex);
                    ar.code = StatusCode.error;
                    ar.message = ex.Message;
                }
                return ar;
            });
        }

        /// <summary>
        /// 批量删除消息记录
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> DelsMessages(P_Message.P_DelsMessages arg)
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    ExceptionMessage em = new ExceptionMessage();
      
                    using (DAL.CarRentEntities db = new CarRentEntities())
                    {
                        int count = db.Database.ExecuteSqlCommand("update ExceptionMessage set Deleted=1 where ExceptionID in(" + arg.id+ ")");
                         
                        ar.message = $"delete {count} data success!";
                        ar.result = new { url = "reload" };
                    }
                }
                catch (Exception ex)
                {
                    Log.Error(this, ex);
                    ar.code = StatusCode.error;
                    ar.message = ex.Message;
                }
                return ar;
            });
        }

        /// <summary>
        /// 根据消息ID删除一条报警消息
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> DelMessage(P_Message.P_DelMessage arg)
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    //DAL.ExceptionMessage dal = new ExceptionMessage()
                    //{
                    //    ExceptionID = arg.exceptionid,

                    //};
                    using (DAL.CarRentEntities db = new CarRentEntities())
                    {
                        var em = db.ExceptionMessage.First(e => e.ExceptionID == arg.exceptionid);
                        em.Deleted = 1;
                        //db.ExceptionMessage.Delete(e => e.ExceptionID == arg.ExceptionID);
                        
                       //var context= db.ExceptionMessage.Attach(dal);//将数据交给EF容器处理
                       // context.Deleted = 1;
                       // db.ExceptionMessage.Remove(dal);
                        int count = db.SaveChanges();
                        ar.message = $"delete{count}a data success!";
                        ar.result = new { url=""};
                    }
                }
                catch (Exception ex)
                {
                    Log.Error(this, ex);
                    ar.code = StatusCode.error;
                    ar.message = ex.Message;
                }
                return ar;
            });
        }
    }
}
