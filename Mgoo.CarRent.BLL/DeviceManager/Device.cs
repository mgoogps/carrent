using Dapper;
using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using Mgoo.CarRent.Models.Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mgoo.CarRent.Models.Parameter;
using Mgoo.CarRent.DAL;
using System.Configuration;
using EntityFramework.Extensions;
using System.Linq.Expressions;
using System.Data;

using System.IO;
using LinqToExcel;
using System.Web;
using Common;

namespace Mgoo.CarRent.BLL.DeviceManager
{
    public class Device : LoginUser
    {
        private string connectionString = "";
        
        public Device()
        {
            connectionString = ConfigurationManager.ConnectionStrings["conntentString"].ConnectionString;
            //database =YiwenGPS;user=sa;pwd=mgoo2016;Data Source=m.mgoogps.com;Max Pool Size = 512;
        }
        public async Task<IApiResult> GetList(Models.Parameter.P_Users.P_UsersByUserID user)
        {
            return await Task.Run(() =>
            {
                IApiResult hr = new IApiResult();
                string strSql = @"select d.DeviceID,d.SerialNumber, case when DeviceName='' then d.SerialNumber else DeviceName end DeviceName,d.Status,l.LastCommunication ,l.DataContext,l.Speed,d.GroupID,d.HireExpireDate,datediff(MI,StopStartUtcDate,serverutcdate) StopTime,
                                (select COUNT(-1) from ExceptionMessage e where e.Deleted=0 and e.DeviceID=d.DeviceID)ExceptionCount,l.OLat Lat,l.OLng Lng,di.DataText as Model,case when di.AccountID=2 then 7 else di.SortOrder end as OffLineMinute,l.IsStop
                                from devices d 
                                left join lklocation l on l.DeviceID = d.DeviceID inner join Dictionary di on di.DataValue=d.Model
                                where d.UserID = @UserID and d.deleted = 0
                                group by d.DeviceID,d.SerialNumber,d.DeviceName,l.DataContext,l.Speed ,d.GroupID,l.LastCommunication,d.HireExpireDate,StopStartUtcDate,serverutcdate,l.OLat,l.OLng,di.DataText,d.ServerID2,di.SortOrder,di.AccountID,d.Status,l.IsStop
                                order by  d.DeviceName collate Chinese_PRC_CS_AS_KS_WS asc";
                try
                {
                    using (System.Data.IDbConnection conn = new SqlConnection(connectionString))
                    {
                        var list = conn.QueryAsync<Models.Entity.Monitor.DeviceList>(strSql, new { UserID = user.userid }).Result.ToList();
                        list.ForEach(item =>
                        {
                            try
                            { 
                                string[] ContextList = (item.DataContext ?? "0-0-0-0").Split('-');
                                if (ContextList.Length == 1)
                                {
                                    item.DataContext = "0-0-0-0-" + item.DataContext;
                                    ContextList = item.DataContext.Split('-');
                                }
                                if (Mgoo.CarRent.Position.ZCChinaLocation.InOutChina(item.Lat, item.Lng))
                                {
                                    Position.Point point = Position.PositionUtil.gps84_To_Gcj02(item.Lat, item.Lng);
                                    item.Lng = point.Lng;
                                    item.Lat = point.Lat;
                                }

                                item.GpsStatus = GetDevicesStatus(item.LastCommunication, item.HireExpireDate, item.OffLineMinute??20);
                                int statusmin = 0;
                                if (item.GpsStatus == 2)
                                {
                                    statusmin = item.LastCommunication == default(DateTime) ? 0 : (DateTime.Now - item.LastCommunication).TotalMinutes.ToString("0").toInt();
                                }
                                else if (item.GpsStatus == 4)
                                {
                                    statusmin = (DateTime.Now - item.HireExpireDate).TotalMinutes.ToString("0").toInt();
                                }
                                else if (item.GpsStatus == 1 && item.IsStop == 0)
                                {
                                    statusmin = item.StopTime ?? 0;
                                }
                                item.OffLineMinute = null;
                                item.GpsStatusMinute = statusmin;
                                item.StopTime = null;
                            }
                            catch (Exception ex)
                            {
                                Log.Error(this, ex);
                            }
                        });
                        hr.result = list;
                        hr.message = $"查询到{list.Count}条数据.";
                    }
                }
                catch (Exception ex)
                {
                    Log.Error(this,ex);
                    hr.message = ex.Message;
                    hr.code = StatusCode.error;
                }
            
                return hr;
            });
        }
        /// <summary>
        /// 编辑，根据设备ID查询设备信息
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> GetDeviceInfo(P_Devices.PDevicesByDeviceID arg)
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db=new CarRentEntities())
                    {

                        var query = from d in db.Devices
                                    join u in db.Users
                                    on d.UserID equals u.UserID
                                    join g in db.Groups
                                    on d.GroupID equals g.GroupID
                                    where (d.DeviceID == arg.deviceid)
                                    select new
                                    {
                                        d.GroupID,
                                        g.GroupName,
                                        d.DeviceName,
                                        u.UserName,
                                        d.SerialNumber,
                                        d.Created,
                                        d.PhoneNum,
                                        d.Description
                                    };
                        ar.result = query.ToList();
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


        /// <summary>
        /// 批量删除设备
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> DelsDevices(P_Devices.P_DelsDevices arg)
        {
            return Task.Run(() => {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db=new CarRentEntities())
                    {
                         int count=  db.Database.ExecuteSqlCommand("update  Devices set Deleted=1 where DeviceID in(" + arg.deviceid + ")");
                         ar.message = $"delete {count} data success!";
                         ar.result = new { url = "" };
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

        public static DataTable OpenCSVFile(string filepath, string pCsvname)
        {
          //  IApiResult ar = new IApiResult();
            try
            {
                DataTable mycsvdt = new DataTable();

                int intColCount = 0;
                bool blnFlag = true;
                DataColumn mydc;

                DataRow mydr;

                string strline;

                string[] aryline;

                StreamReader mysr = new StreamReader(filepath, System.Text.Encoding.Default);

                while ((strline = mysr.ReadLine()) != null)
                {
                    //给datatable加上列名
                    aryline = strline.Split(new char[] { ',' });

                    if (blnFlag)
                    {
                        blnFlag = false;
                        intColCount = aryline.Length;
                        for (int i = 0; i < aryline.Length; i++)
                        {
                            mydc = new DataColumn(aryline[i].ToString());
                            mycsvdt.Columns.Add(mydc);
                        }
                        continue;
                    }
                    //填充数据并加入到datatable中
                    mydr = mycsvdt.NewRow();
                    for (int i = 0; i < intColCount; i++)
                    {
                        mydr[i] = aryline[i];
                    }
                    mycsvdt.Rows.Add(mydr);
                }
                return mycsvdt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //linqtoExecl
        //public Task<IApiResult> CheckImportFile(string filename, List<DAL.Devices> ds) {
        //    return Task.Run(() => {
        //        IApiResult ar = new IApiResult();
        //        try
        //        {

        //            using (DAL.CarRentEntities db = new CarRentEntities())
        //            {
        //                var targetFile = new FileInfo(filename);
        //                if (!targetFile.Exists)
        //                {

        //                    ar.message = "导入的数据文件不存在";
        //                    ar.code = StatusCode.error;
        //                }
        //                var excelFile = new ExcelQueryFactory(filename);
        //                excelFile.AddMapping<DAL.Devices>(d=>d.SerialNumber, "SerialNumber");
        //                excelFile.AddMapping<DAL.Devices>(d => d.DeviceName, "DeviceName");
        //                excelFile.AddMapping<DAL.Devices>(d => d.DevicePassword, "DevicePassword");
        //                excelFile.AddMapping<DAL.Devices>(d => d.CarUserName, "CarUserName");
        //                excelFile.AddMapping<DAL.Devices>(d => d.CarNum, "CarNum");
        //                excelFile.AddMapping<DAL.Devices>(d => d.CellPhone, "CellPhone");
        //                excelFile.AddMapping<DAL.Devices>(d => d.Status, "Status");
        //                excelFile.AddMapping<DAL.Devices>(d => d.PhoneNum, "PhoneNum");
        //                excelFile.AddMapping<DAL.Devices>(d => d.Model, "Model");
        //                excelFile.AddMapping<DAL.Devices>(d => d.Description, "Description");
        //                excelFile.AddMapping<DAL.Devices>(d => d.Created, "Created");
        //                excelFile.AddMapping<DAL.Devices>(d => d.Deleted, "Deleted");
        //                excelFile.AddMapping<DAL.Devices>(d => d.ActiveDate, "ActiveDate");
        //                excelFile.AddMapping<DAL.Devices>(d => d.HireStartDate, "HireStartDate");
        //                excelFile.AddMapping<DAL.Devices>(d => d.HireExpireDate, "HireExpireDate");
        //                excelFile.AddMapping<DAL.Devices>(d => d.SpeedLimit, "SpeedLimit");
        //                excelFile.AddMapping<DAL.Devices>(d => d.UserID, "UserID");
        //                excelFile.AddMapping<DAL.Devices>(d => d.GroupID, "GroupID");
        //                excelFile.AddMapping<DAL.Devices>(d => d.Icon, "Icon");
        //                excelFile.AddMapping<DAL.Devices>(d => d.BSJIP, "BSJIP");
        //                excelFile.AddMapping<DAL.Devices>(d => d.AddHireDay, "AddHireDay");
        //                excelFile.AddMapping<DAL.Devices>(d => d.Deleted, "Deleted");
        //                excelFile.AddMapping<DAL.Devices>(d => d.ServerID, "ServerID");
        //                excelFile.AddMapping<DAL.Devices>(d => d.OilPrice, "OilPrice");
        //                excelFile.AddMapping<DAL.Devices>(d => d.CreatedByUser, "CreatedByUser");
        //                excelFile.AddMapping<DAL.Devices>(d => d.ExpireByUser, "ExpireByUser");
        //                excelFile.AddMapping<DAL.Devices>(d => d.OilVolume, "OilVolume");
        //                excelFile.AddMapping<DAL.Devices>(d => d.OilLow, "OilLow");
        //                excelFile.AddMapping<DAL.Devices>(d => d.OilHigh, "OilHigh");
        //                excelFile.AddMapping<DAL.Devices>(d => d.CarImg, "CarImg");
        //                excelFile.AddMapping<DAL.Devices>(d => d.ServerID2, "ServerID2");
        //                excelFile.AddMapping<DAL.Devices>(d => d.ByDistance, "ByDistance");
        //                excelFile.AddMapping<DAL.Devices>(d => d.LastByDistance, "LastByDistance");
        //                //SheetName
        //                var excelContent = excelFile.Worksheet < DAL.Devices >(0);
        //                int rowIndex = 1;
        //                foreach (var item in excelContent)
        //                {
        //                    var sb = new StringBuilder();
        //                    DAL.Devices de = new DAL.Devices();
        //                    de.SerialNumber = item.SerialNumber;
        //                    de.PhoneNum = item.CellPhone;
        //                    de.Description = item.Description;


        //                }
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            Log.Error(this, ex);
        //            ar.message = ex.Message;
        //            ar.code = StatusCode.error;
        //        }
        //        return ar;
        //    });

        //}





        /// <summary>
        /// 新增设备AddDevice
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> AddDevice(P_Devices.P_AddDevice arg)
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new CarRentEntities())//EF数据上下文
                    {
                        //将要添加的数据封装成对象
                        DAL.Devices ds = new DAL.Devices();
                        ds.UserID = arg.userid;
                        ds.SerialNumber = arg.imei;
                        ds.DeviceName = arg.devicename;
                        ds.PhoneNum = arg.phonenumber;
                        ds.GroupID = arg.groupid;
                        ds.Created = DateTime.Now;
                        ds.Status = 0;
                        ds.Model = 201;
                        ds.Deleted = false;
                        ds.ActiveDate = Convert.ToDateTime("1900-01-01 00:00:00.000");
                        ds.HireStartDate = DateTime.Now.AddHours(-8);
                        ds.HireExpireDate = Convert.ToDateTime("1900-01-01 00:00:00.000");
                        ds.DevicePassword = "123456";
                        ds.Description = arg.remark;
                        db.Devices.Add(ds);
                        db.SaveChanges();
                        ar.message = $"added successfully!";
                        ar.result = new { url = "reload" };
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

        /// <summary>
        /// 删除一条设备记录
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> DelDevice(P_Devices.P_DelDevice arg)
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new CarRentEntities())
                    {
                       var de= db.Devices.First(d => d.DeviceID == arg.id);
                       de.Deleted = true ;
                       int count=db.SaveChanges();
                        ar.message = $"delete{count} data success!";
                        ar.result = new { url = "" };
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

       

        /// <summary>
        /// 修改设备信息
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> UpdateDeviceInfo(P_Devices.P_UpdateDeviceInfo arg)
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    DAL.Devices d = new DAL.Devices();
                    
                    d.DeviceID = arg.deviceid;
                    using (DAL.CarRentEntities db = new CarRentEntities())
                    {
                        var device = db.Devices.Find(arg.deviceid);
                        device.DeviceName = arg.devicename;
                        device.Description = arg.description;
                        device.GroupID = arg.groupid;
                        db.SaveChanges();//保存至数据库中
                        ar.message = "Device information is modified successfully";
                        ar.result = new { url = "reload" };

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

        /// <summary>
        /// 获取设备信息列表
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> GetDeviceList(P_Devices.P_GetDeviceList arg)
        {
          
            return Task.Run(() => {
                IApiResult ar = new IApiResult();
              //  var uid = userInfo.UserID;//获取当前登录的用户ID
                try
                {
                    using (DAL.CarRentEntities db = new CarRentEntities())
                    {
                        var index = (arg.p - 1) * arg.pagesize;
                        var deviceQuery = from d in db.Devices
                                          join u in db.Users
                                          on d.UserID equals u.UserID
                                          join g in db.Groups
                                          on d.GroupID equals g.GroupID
                                          join di in db.Dictionary
                                          on d.Model equals di.DataValue
                                          join l in db.LKLocation
                                          on d.DeviceID equals l.DeviceID
                                          into lk
                                          from d1 in lk.DefaultIfEmpty()
                                          where d.Deleted == false
                                          select new Models.Return.R_Devices.GetDeviceListPage.GetDeviceListPage_Result.GetDeviceListPage_List
                                          {
                                              GroupName=g.GroupName,
                                              DeviceID = d.DeviceID,
                                              DeviceName = d.DeviceName,
                                              SerialNumber = d.SerialNumber,
                                              Created = d.Created,
                                              PhoneNum=d.PhoneNum,
                                              Description = d.Description,
                                              UserID = d.UserID,
                                              UserName = u.UserName,
                                              SortOrder = di.SortOrder ?? 0,
                                              LastCommunication = d1.LastCommunication == null ? default(DateTime) : d1.LastCommunication,
                                          };
                        if (arg.start_date != null)
                        {
                            deviceQuery = deviceQuery.Where((d) => d.Created >= arg.start_date);
                        }
                        if (arg.end_date != null)
                        {
                            deviceQuery = deviceQuery.Where((d) => d.Created <= arg.end_date);
                        }
                        if (arg.keyword != null)
                        {
                            deviceQuery = deviceQuery.Where((d) => d.DeviceName.Contains(arg.keyword) || d.SerialNumber.Contains(arg.keyword) || d.Description.Contains(arg.keyword));
                        }
                        if (arg.userid != null && arg.userid > 0)
                        {
                            deviceQuery = deviceQuery.Where(d => d.UserID == arg.userid);
                        }
                        var count = deviceQuery.Count();
                        var list = deviceQuery.OrderBy((r) => r.DeviceID).Skip(index).Take(arg.pagesize).ToList();
                        list.ForEach((s) => { s.RowIndex = ++index; });
                        ar.message = $"There are {count} data";
                        ar.result = new
                        {
                            total = count,
                            pages = count % arg.pagesize == 0 ? count / arg.pagesize : count / arg.pagesize + 1,
                            list = list
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
      
        public Task<IApiResult> EndRental(P_Devices.PDevicesByDeviceID arg)
        {
            return Task.Run(() =>
            {
                IApiResult hr = new IApiResult();
                using (CarRentEntities db = new CarRentEntities())
                {
                    try
                    {
                        var leaser = (from lr in db.LeaseRecord where lr.DeviceID == arg.deviceid && lr.Status == 2 select lr).SingleOrDefault();
                        if (leaser == null)
                        {
                            hr.message = "Can not find element.";//未找到状态为 2 的设备
                            hr.code = StatusCode.failure;
                            return hr;
                        }
                        var dev = (from d in db.Devices where d.DeviceID == leaser.DeviceID select d).Single();
                        var user = db.Users.Find(dev.UserID);
                        var endTime = DateTime.Now;
                        TimeSpan ts = (endTime - leaser.StartTime).Value;
                        if (ts.TotalMinutes <= 5)
                        {
                            hr.message = "Free for five minutes!";
                        }
                        else
                        {
                            ///结束租车后，扣除用户余额里面的 点数
                            var mi = Math.Ceiling((ts.TotalMinutes - 5) / 60);
                            var money = Convert.ToInt32(mi * user.ActivationCount);
                            leaser.Fee = money;
                            user.MoneyCount = user.MoneyCount - money;
                            hr.message = "Charges are successful!";
                        }
                     
                        dev.Status = 0;  //Status (1:已租，0:未租) 
                        leaser.Status = CarRent.Common.Lib.CarStatus.Complete.toInt();  //1 已申请，等待确认，2 正在出租，3出租完成，4已拒绝
                        leaser.EndTime = endTime;
                        db.SaveChanges();
                      
                    }
                    catch (Exception ex)
                    {
                        hr.message = ex.Message;
                        hr.code = StatusCode.error;
                    }
                }
                return hr;
            });
        }

        public Task<IApiResult> StartRental(P_OnlyOneID arg)
        {
            return Task.Run(() =>
            {
                IApiResult hr = new IApiResult();
                using (CarRentEntities db = new CarRentEntities())
                {
                    try
                    {
                        var leaser = (from l in db.LeaseRecord where l.LeaseID == arg.id && l.Status == 1 select l).SingleOrDefault();
                        if (leaser == null)
                        {
                            hr.code = StatusCode.failure;
                            hr.message = "Has been rented."; //已经租了
                            return hr;
                        }
                        var dev = (from d in db.Devices where d.DeviceID == leaser.DeviceID select d).SingleOrDefault();
                        var user = db.Users.Find(dev.UserID);
                        if (user.MoneyCount < user.ActivationCount)
                        {
                            hr.code = StatusCode.failure;
                            hr.message = "Insufficient balance."; //用户余额不足
                            return hr;
                        }
                        dev.Status = 1;  //Status (1:已租，0:未租)

                        //var leaser = (from lr in db.LeaseRecord where lr.LeaseID == arg.id select lr).Single();

                        leaser.Status = Mgoo.CarRent.Common.Lib.CarStatus.BeingRented.toInt();  //1 已申请，等待确认，2 正在出租，3出租完成，4已拒绝
                        leaser.StartTime = DateTime.Now;
                     
                        //db.LeaseRecord.UpdateAsync(l => l.LeaseID==arg.id, l=> new LeaseRecord { Status = 2 });
                        
                        db.Entry(leaser).State = System.Data.Entity.EntityState.Modified;
                        db.Entry(dev).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();
                        hr.message = "success!";
                    }
                    catch (Exception ex)
                    {
                        hr.message = ex.Message;
                        hr.code = StatusCode.error;
                    }
                }
                return hr;
            });
        }

        public Task<IApiResult> GetCarRequest( P_Users.P_UsersByUserID arg)
        {
            return Task.Run(() =>
            {
                IApiResult hr = new IApiResult();
                using (CarRentEntities db = new CarRentEntities())
                {
                    var dev = from d in db.Devices
                              join lr in db.LeaseRecord
                              on d.DeviceID equals lr.DeviceID
                              where lr.Status == 1  && d.Status == 0 //Status (1:已租，0:未租)
                              select new {lr.LeaseID, d.DeviceID,d.DeviceName,d.SerialNumber,lr.UserPhone,lr.Created,lr.Status };
                    var list = dev.ToList(); 
                    hr.result = list;
                    hr.message = $"查询到了{list.Count}条数据.";
                }
                return hr;
            });
        }

        public Task<IApiResult> CarRequest(Models.Parameter.P_Devices.P_CarRequest arg)
        {
            return Task.Run(() =>
            {
                IApiResult hr = new IApiResult();
                using (CarRentEntities cre = new CarRentEntities())
                {
                    try
                    {
                        //var deviceQuery = from d in cre.Devices where d.DeviceID == arg.deviceid select new { d.Status,d.DeviceName };
                        //var device = deviceQuery.First();
                        //if (device.Status == 1)
                        //{
                                
                        //}
                        var dev =  from d in cre.Devices 
                                   join l in cre.LeaseRecord 
                                   on d.DeviceID equals l.DeviceID
                                   into lr
                                   from dli in lr.DefaultIfEmpty()
                                   where d.DeviceID == arg.deviceid && d.Deleted == false
                                   orderby dli.Created descending
                                   select new{ dli.Status , devStatus = d.Status, d.UserID,d.DeviceID };
                        var query = dev.FirstOrDefault();
                        //Status (1:已租，0:未租)
                        if (query.Status == 1)
                        {
                            hr.code = StatusCode.failure;
                            hr.message = "Occupied."; //已经被别人申请了
                        }
                        else if(query.Status == 2){
                            hr.code = StatusCode.failure;
                            hr.message = "Occupied.";//已经租出去了
                        }
                        else
                        {
                            LeaseRecord lr = new LeaseRecord();
                            lr.DeviceID = query.DeviceID;
                            //1 已申请，等待确认，2 正在出租，3出租完成，4已拒绝
                            lr.Status = 1;
                            lr.UserPhone = arg.phone;
                            lr.UserID = query.UserID;
                            lr.Created = DateTime.Now;
                            lr = cre.LeaseRecord.Add(lr);
                            //DAL.Devices device = new DAL.Devices();
                            //device.Status = 1;
                            cre.SaveChanges();
                            hr.message = "success!";
                        }
                    }
                    catch (InvalidOperationException ioe)
                    {
                        hr.message = "未找到元素";
                        hr.code = StatusCode.error;
                        Log.Error(this, ioe);
                    }
                    catch (Exception ex)
                    {
                        hr.message = ex.Message;
                        hr.code = StatusCode.error;
                        Log.Error(this, ex);
                    }
                    return hr;
                }
            });
        }
     
        public Task<IApiResult> GetDevice(P_Devices.PDevicesByDeviceID arg)
        {
            return Task.Run(() =>
            {
                IApiResult hr = new IApiResult(); 
                try
                { 
                    using (CarRentEntities cre = new CarRentEntities())
                    {
                        Func<double, double,bool> inoutChina = (lat,lng) =>  Mgoo.CarRent.Position.ZCChinaLocation.InOutChina(Convert.ToDouble(lat), Convert.ToDouble(lng))  ;
                      
                        var devs = from d in cre.Devices
                                   join l in cre.LKLocation
                                   on d.DeviceID equals l.DeviceID
                                   into dl
                                   from dli in dl.DefaultIfEmpty()
                                   where d.DeviceID == arg.deviceid && d.Deleted == false
                                  // let po =   new Position.Point(Convert.ToDouble(dli.OLat ?? -1.00m), Convert.ToDouble(dli.OLng ?? -1.00m)) 
                                   //let isChina = inoutChina(po.Lat, po.Lng)
                                   //let point = isChina ? new Position.Point(po.Lat, po.Lng) : Position.PositionUtil.gps84_To_Gcj02(po.Lat, po.Lng)
                                   select new Models.Return.R_Devices.GetDevice_Result
                                   {
                                       DeviceID = d.DeviceID,
                                       DeviceName = d.DeviceName,
                                       SerialNumber = d.SerialNumber,
                                       Status = d.Status,
                                       DataContext = dli.DataContext ?? "",
                                       Lat = dli.OLat ?? -1.00m,
                                       Lng = dli.OLng ?? -1.00m,
                                       Speed = dli.Speed ?? default(decimal),
                                       LastCommunication = dli.LastCommunication == null ? default(DateTime) : dli.LastCommunication,
                                       Course = dli.Course ?? default(decimal),
                                       IsStop = dli.IsStop ?? default(int)
                                   };
                        var list = devs.ToList() ;
                        list.ForEach((item) =>
                        {
                            //如果是在中国大陆则需要转换一下坐标
                            if (Position.ZCChinaLocation.InOutChina(Convert.ToDouble(item.Lat), Convert.ToDouble(item.Lng)))
                            {
                                Position.Point point = Position.PositionUtil.gps84_To_Gcj02(Convert.ToDouble(item.Lat), Convert.ToDouble(item.Lng));
                                item.Lng = Convert.ToDecimal(point.Lng);
                                item.Lat = Convert.ToDecimal(point.Lat);
                            }
                        });
                        hr.result = list;
                        hr.message = $"查询到{list.Count}条数据.";
                    }
                }
                catch (Exception ex)
                {
                    hr.message = ex.Message;
                    hr.code = StatusCode.error;
                    Log.Error(this,ex);
                }
               return hr;
           });
        }

        private int GetDevicesStatus(DateTime LastCommunication, DateTime HireExpireDate, int OffLineMinute)
        {
            int status = 0;
            if (LastCommunication == null)
            {
                status = 3;  // 未激活
                return status;
            }
            TimeSpan? ts = (DateTime.Now - LastCommunication);
            if (ts != null && ts.Value.TotalMinutes < OffLineMinute)
            {
                status = 1;  //在线
            }
            else
            {
                status = 2; //离线
            }

            if (HireExpireDate <= DateTime.Now && HireExpireDate > Convert.ToDateTime("1901-1-1 0:00:00"))
            {
                status = 4; //已过期
            }
            return status;
        }


    }
}
