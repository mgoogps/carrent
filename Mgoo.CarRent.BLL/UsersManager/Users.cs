using Dapper;
using Mgoo.CarRent.Common;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Mgoo.CarRent.Models.Parameter;
using System.Drawing;
using System.IO;
using Mgoo.CarRent.Interface;
using Mgoo.CarRent.Models.Return;

namespace Mgoo.CarRent.BLL.UsersManager
{
    public class Users : LoginUser
    {
        private string connectionString = "";
        
        public Users()
        {
            connectionString = ConfigurationManager.ConnectionStrings["conntentString1"].ConnectionString;
            //database=YiwenGPS;user=sa;pwd=mgoo2016;Data Source=m.mgoogps.com;Max Pool Size = 512;
        }
        public async Task<IApiResult> GetList(Mgoo.CarRent.Models.Parameter.P_Users.P_UsersByUserID user)
        {
            return await Task.Run(() =>
            {
                IApiResult hr = new IApiResult();

                string strSql = @"with subqry(UserID,UserName,ParentID,UserType) as (
                              select UserID, UserName, ParentID, UserType from Users   where UserID = @UserID
                              union all
                              select Users.UserID, Users.UserName, Users.ParentID, Users.UserType from Users, subqry
                              where Users.ParentID = subqry.UserID and users.Deleted != 1
                              )
                              select UserID, UserName, ParentID, UserType from subqry order by username collate Chinese_PRC_CS_AS_KS_WS; ";
                using (System.Data.IDbConnection conn = new SqlConnection(connectionString))
                {
                    List<Models.Entity.Users> list = conn.QueryAsync<Models.Entity.Users>(strSql, new { UserID = 7 }).Result.ToList();
                    hr.result = list;// JsonHelper.ToJson(list);
                    hr.message = $"A total of {list.Count} data.";
                } 
                return hr;
            });
        }

        public Task<IApiResult> GetListSimple()
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        var query = from u in db.Users
                                    where u.Deleted == false && (u.ParentID == userInfo.UserID || u.UserID == userInfo.UserID)
                                    select new { u.UserID, u.UserName };
                        var list = query.ToList();
                        ar.result = list;
                        ar.message = $"There are {list.Count} data";
                    }
                }
                catch (Exception ex)
                {
                    Log.Error(this, ex);
                    ar.message = ex.Message;
                    ar.code = StatusCode.error;
                }
                return ar;
            });
           
           
           
        }
        /// <summary>
        /// 获取供应商列表
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public async Task<IApiResult> GetList(P_Users.P_GetUserListPage arg)
        {
            return await Task.Run(()=> 
            {
                IApiResult ar = new IApiResult();
                var userid = userInfo.UserID;
                try
                {
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        var query = from u in db.Users
                                    where u.ParentID == userid && u.Deleted == false
                                    select new Models.Return.R_Users.GetUsersListPage_Result.GetUsersListPage_List
                                    {
                                        UserID = u.UserID,
                                        UserName = u.UserName,
                                        LoginName = u.LoginName,
                                        Contact = u.FirstName??"",
                                        CellPhone = u.CellPhone??"",
                                        Price = u.ActivationCount,
                                        AllDeviceCount = u.AllDeviceCount,
                                        Created = u.Created,
                                        Address = u.Address1??""
                                    };
                        if (arg.start_date != null)
                        {
                            query = query.Where(u => u.Created >= arg.start_date);
                        }
                        if (arg.end_date != null)
                        {
                            query = query.Where(u => u.Created <= arg.end_date);
                        }
                        if (!string.IsNullOrEmpty(arg.keyword))
                        {
                            query = query.Where(u => u.UserName.Contains(arg.keyword) || u.LoginName.Contains(arg.keyword) || u.Contact.Contains(arg.keyword) || u.CellPhone.Contains(arg.keyword));
                        }
                        int index = (arg.p - 1) * arg.pagesize;
                        var total = query.Count();
                        var list = query.OrderBy(u => u.UserID).Skip(index).Take(arg.pagesize).ToList();
                        list.ForEach(item => item.RowIndex = ++index);
                        ar.result = new
                        {
                            total = total,
                            pages = Math.Ceiling(Convert.ToDecimal(total / Convert.ToDouble(arg.pagesize))),
                            list = list,
                        };
                        ar.message = $"There are {total} data";
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
        /// 批量删除用户凭证
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> DelsRechargeRecord(P_Users.P_DelsApplications arg)
        {
            return Task.Run(() => {
                IApiResult ar = new IApiResult();
                try
                {
                    using ( DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        //返回受影响的行数
                       int count= db.Database.ExecuteSqlCommand("update RechargeRecord set Deleted=1 where RID in("+arg.id+")");
                        ar.message = $"delete {count} data success!";
                        ar.result = new { url = "reload" };
                    }
                }
                catch (Exception ex)
                {

                    throw ex;
                }
                return ar;
            });
        }

        /// <summary>
        /// 批量删除用户信息
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> DelsUsersInfo(P_Users.P_DelsUsers arg)
        {
            return Task.Run(() => {
                IApiResult ar = new IApiResult();
                try
                {
                   using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        int count=db.Database.ExecuteSqlCommand("update Users set Deleted=1 where UserID in("+arg.id+")");
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
        /// 删除子用户
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> DelUserInfo(P_Users.P_DelUser arg)
        {
            return Task.Run(() => {
                IApiResult ar = new IApiResult();
                try
                {
                     using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        DAL.Users us = new DAL.Users();
                        var res= db.Users.First(u => u.UserID == arg.userid);
                        res.Deleted = true;
                        int count = db.SaveChanges();
                        ar.message = $"delete{count}a data success!";
                        ar.result = new { url = "" };
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
        /// 添加子用户
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> AddUsers(P_Users.P_AddUsers arg)
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        DAL.Users us = new DAL.Users();
                        us.UserName = arg.username;
                        us.LoginName = arg.account;
                        us.FirstName = arg.contact;
                        us.CellPhone = arg.phone;
                        us.Password = "123456";
                        us.Address1 = arg.address;
                        us.Deleted = false;
                        us.PrimaryEmail = arg.email;
                        us.Created = DateTime.Now;
                        us.UpdateTime = DateTime.Now;
                        us.AllDeviceCount = 0;
                        us.ActivationCount = arg.price*100;
                        us.MoneyCount = 0;
                        us.ParentID = 1;
                        us.SuperAdmin = 0; 
                        db.Users.Add(us);
                        db.SaveChanges();
                        ar.message = "Add successfu!";
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

        public Task<IApiResult> RechargeApply(P_Users.P_RechargeApply arg)
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    string path = "", fileName = "";
                    using (MemoryStream stream = new MemoryStream(Convert.FromBase64String(arg.proof)))
                    {
                        var img = new Bitmap(stream);
                        fileName = DateTime.Now.Ticks + ".png";
                        string baseDirectory = System.AppDomain.CurrentDomain.BaseDirectory;
                        path = "/Assets/images/proof/";
                        if (!System.IO.Directory.Exists(baseDirectory + path))
                        {
                            Directory.CreateDirectory(baseDirectory + path);
                        }
                        img.Save(baseDirectory + path + fileName);
                        stream.Dispose(); 
                        img.Dispose();
                    }
                  
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        DAL.RechargeRecord rr = new DAL.RechargeRecord();
                       
                        rr.Money = arg.money;
                        rr.Created = DateTime.Now;
                        rr.UserID = userInfo.UserID ;
                        rr.PaymentMethod = arg.payment_method;
                        rr.TransferMethod = arg.transfer_method;
                        rr.TransferTime = arg.transfer_time;
                        rr.ProofImg = path + fileName;
                        rr.IsCheck = false;
                        rr.Remark = arg.remark;
                        db.RechargeRecord.Add(rr);
                        int i = db.SaveChanges();
                        ar.message = i+" row of data is affected."; 
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

        public Task<IApiResult> DeleteRecharge(P_OnlyOneID arg)
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        var rr = db.RechargeRecord.First(r => r.RID == arg.id); 
                        rr.Deleted = true;
                        db.SaveChanges();
                        ar.message = "success!";
                    }
                }
                catch (Exception ex)
                {
                    Log.Error(this, ex);
                    ar.message = ex.Message;
                    ar.code = StatusCode.error;
                }
                return ar;
            });
        }

        public Task<IApiResult> ProofReview(P_OnlyOneID arg)
        {
            return Task.Run(() => 
            {
                IApiResult ar = new IApiResult();
                try
                { 
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities ())
                    {
                        var rr = db.RechargeRecord.Where(r => r.RID == arg.id && r.IsCheck == false).FirstOrDefault();
                        var user = db.Users.First(u => u.UserID == rr.UserID);
                        if (rr != null)
                        {
                            rr.IsCheck = true;
                            rr.CheckTime = DateTime.Now;
                            var money = user.MoneyCount;
                            user.MoneyCount = money + rr.Money;
                            db.SaveChanges();
                        }
                        ar.message = "Has been reviewed.";
                    }
                }
                catch (Exception ex)
                {
                    Log.Error(this,ex);
                    ar.message = ex.Message;
                    ar.code = StatusCode.error;
                }
                return ar; 
            });
        }
        #region 修改用户个人信息  UpdateUsersInfo(P_Users.P_UpdateUsersInfo arg)
        /// <summary>
        /// 修改个人信息
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> UpdateUsersInfo(P_Users.P_UpdateUsersInfo arg)
        {
            return Task.Run(() =>
            {
                IApiResult hr = new IApiResult();
                try
                {
                    //DAL.Users user = new DAL.Users();
                    //user.UserID = userInfo.UserID; 
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        var u = db.Users.Find(arg.userid);
                        u.UserName = arg.username;
                        u.CellPhone = arg.phone;
                        u.FirstName = arg.contact;
                        u.PrimaryEmail = arg.email;
                        u.Address1 = arg.address;
                        u.UpdateTime = DateTime.Now;
                        u.ActivationCount = arg.price*100;
                        db.SaveChanges();
                      
                    }
                    hr.message = "User information is modified successfully";
                    hr.result = new { url = "reload" };
                }
                catch (Exception ex)
                {
                    Log.Error(this,ex);
                    hr.code = StatusCode.error;
                    hr.message = ex.Message;
                } 
                return hr;
            });
        }

        #endregion
        public Task<IApiResult<R_Users.GetRechargeApplyList_Result>> GetRechargeApplyList(P_Users.P_GetRechargeApplyList arg)
        {
            return Task.Run(() =>
            {
                IApiResult<R_Users.GetRechargeApplyList_Result> ar = new IApiResult<R_Users.GetRechargeApplyList_Result>();
                try
                {
                    string host = "";
                    var prot = 80;
                    arg.GetHost(out host, out prot);
                    if (prot != 80)
                    {
                        host += ":" + prot + "/";
                    }

                    //select new
                    //{
                    //    r.RID,
                    //    r.IsCheck,
                    //    r.Created,
                    //    r.Bank,
                    //    r.PaymentMethod,
                    //    Rroof = host + r.ProofImg,
                    //    r.TransferTime,
                    //    u.UserName,
                    //    u.UserID
                    //};
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        var rr = from r in db.RechargeRecord
                                 join u in db.Users on r.UserID equals u.UserID
                                 where r.Deleted == false
                                 select new Models.Return.R_Users.GetRechargeApplyList_Result.GetRechargeApplyList_PageList
                                 {
                                     PaymentMethod = r.PaymentMethod,
                                     IsCheck = r.IsCheck,
                                     TransferMethod = r.TransferMethod,
                                     RID = r.RID,
                                     Proof = host + r.ProofImg,
                                     TransferTime = r.TransferTime,
                                     UserID = u.UserID,
                                     UserName = u.UserName,
                                     Remark = r.Remark,
                                     Fee = r.Money,
                                     Created = r.Created
                                 };
                        if (arg.type != 2)
                        {
                            bool a = arg.type == 1 ? true : false;
                            rr = rr.Where(r => r.IsCheck == a);
                        }
                        if (arg.start_time != null)
                        {
                            rr.Where(r => r.TransferTime>= arg.start_time);
                        }
                        if (arg.end_time != null)
                        {
                            rr.Where(r => r.TransferTime <= arg.end_time);
                        }
                        if (arg.transfer_method != null)
                        {
                            rr.Where(r => r.PaymentMethod == arg.transfer_method);
                        }
                        int count = rr.Count();
                        var index = (arg.p - 1) * arg.pagesize;

                        var list = rr.OrderBy((r) => r.RID).Skip(index).Take(arg.pagesize).ToList();
                        list.ForEach((s)=> { s.RowIndex = ++index; });
                        ar.message = $"There are {count} data";
                        //ar.result =  new 
                        //{
                        //    total = count,
                        //    pages = Math.Ceiling(count/arg.pagesize+0.0) + 1,
                        //    list = list 
                        //};
                        ar.result = new R_Users.GetRechargeApplyList_Result
                        {
                            total = count,
                            list = list,
                            pages = count % arg.pagesize == 0 ? count / arg.pagesize : count / arg.pagesize + 1,
                        };
                    }
                }
                catch (Exception ex)
                {
                    Log.Error(this, ex);
                    ar.code = Interface.StatusCode.error;
                    ar.message = ex.Message;
                }
                return ar;
            });
        }
       
        #region 根据用户ID获取用户信息 + Task<IApiResult> GetUserInfo(Models.Parameter.P_Users.P_UsersByUserID user)
        /// <summary>
        /// 根据用户ID获取用户信息
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<IApiResult> GetUserInfo(Models.Parameter.P_Users.P_UsersByUserID user)
        {
            return await Task.Run(() =>
            {
                IApiResult hr = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        var query = from u in db.Users
                                    where (u.UserID == user.userid)
                                    select new
                                    {
                                        u.UserName,
                                        u.LoginName,
                                        u.PrimaryEmail,
                                        u.CellPhone,
                                        u.FirstName,
                                        u.Address1,
                                        price = u.ActivationCount
                                    };
                        hr.result = query.ToList();
                    }
                }
                catch (Exception ex)
                {
                    if (ex.InnerException != null)
                        ex = ex.InnerException;
                    Log.Error(this, ex);
                    hr.code = Interface.StatusCode.error;
                    hr.message = ex.Message;
                }
                return hr;
                // return new IApiResult() { result= userInfo  }; 
            });
        }
        #endregion
      
        /// <summary>
        /// 修改用户密码
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> UpdateUserPwd(P_Users.P_UpdatePwd arg)
        { 
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        var us = db.Users.Where(u => u.UserID == arg.userid).FirstOrDefault();
                        if (us != null && us.Password==arg.old_userpwd)
                        { 
                            us.Password = arg.new_userpwd;
                            db.SaveChanges();
                            ar.message = "success!";
                        }
                        else
                        {
                            ar.code = Interface.StatusCode.parameterError;
                            ar.message = "Old password error";
                            
                        }
                    }
                }
                catch (Exception ex)
                { 
                    Log.Error(this, ex);
                    ar.code = Interface.StatusCode.error;
                    ar.message = ex.Message;
                }
                return ar;
            });
        }
    }
}
