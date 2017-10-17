using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mgoo.CarRent.Interface;
using Mgoo.CarRent.Models.Parameter;
using Mgoo.CarRent.Common;
using System.Data.Entity.Core.Objects;
using System.Data.Entity;

namespace Mgoo.CarRent.BLL.WeixinManager
{
    public class Weixin : LoginUser
    {
        public Task<IApiResult> GetDeviceInfo(P_Weixin.P_GetDeviceInfo arg)
        {
            return Task.Run(() => 
            {
                IApiResult ar = new IApiResult();
                try
                { 
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        var query = from d in db.Devices
                                    join u in db.Users
                                    on d.UserID equals u.UserID
                                    join l in db.LeaseRecord 
                                    on d.DeviceID equals l.DeviceID into dl
                                    from dli in dl.DefaultIfEmpty()
                                    where d.DeviceID == arg.deviceid && d.Deleted == false
                                    select new
                                    {
                                        d.DeviceID,
                                        d.DeviceName,
                                        d.SerialNumber,
                                        Price = u.ActivationCount,
                                        d.Status,  //Status (1:已租，0:未租) 
                                        dli.StartTime,
                                        u.CellPhone,
                                        Time = DbFunctions.DiffMinutes(dli.StartTime??DateTime.Now, DateTime.Now).Value 
                                    };
                        var device = query.FirstOrDefault();
                        if (device == null)
                        {
                            ar.message = "No data found.";
                            return ar;
                        }
                        ar.message = "success!"; 
                        ar.result = device;
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


     
    }
}
