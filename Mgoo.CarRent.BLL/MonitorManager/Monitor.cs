using Mgoo.CarRent.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using Mgoo.CarRent.Models.Entity;
using System.Configuration;
using Mgoo.CarRent.Interface;

namespace Mgoo.CarRent.BLL.MonitorManager
{
    public class Monitor: LoginUser
    {
        private string connectionString = "";
     
        public Monitor()
        {
            //  connectionString = ConfigurationManager.ConnectionStrings["conntentString"].ConnectionString;
            connectionString = "database=YiwenGPS;user=sa;pwd=mgoo2016;Data Source=m.mgoogps.com;Max Pool Size = 512;";
             
        }
        public async Task<IApiResult> GetUserList( )
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
                    List<Users> list = conn.QueryAsync<Users>(strSql, new { UserID = 7 }).Result.ToList();
                    hr.result = list;// JsonHelper.ToJson(list);
                    hr.message = "用户列表查询成功.";
                } 
                return hr;
            });
        }
        public async Task<IApiResult> GetAlarmList(Models.Parameter.P_Users.P_UsersByUserID al)
        {
            return await Task.Run(() =>
            {
                IApiResult hr = new IApiResult();

                string strSql = "select Address2 from Users where UserID=@UserID";
                using (System.Data.IDbConnection conn = new SqlConnection(connectionString))
                {
                    string strWhere = conn.ExecuteScalar(strSql, new { UserID = al.userid }).ToString();
                    if (!string.IsNullOrEmpty(strWhere))
                    {
                        strWhere = " and e.NotificationType in(" + strWhere + ")";
                    }
                    strSql = @" with userlist(UserID,UserName) as (
                        select UserID,UserName  from Users where UserID = @UserID and users.Deleted =0
                        union all
                        select Users.UserID,Users.UserName from Users,userlist
                        where Users.ParentID = userlist.UserID
                        ) 
                        select top 101 d.DeviceName ,e.DeviceID,DataText,d.SerialNumber,u.UserName,u.UserID,e.ExceptionID,e.NotificationType,
                        case when geo.FenceName is null then Message else Message+':'+geo.FenceName end Message,DATEADD(HH,8, e.Created)ExceptionCreated
                        from ExceptionMessage e inner join Devices d on e.DeviceID = d.DeviceID inner join Dictionary di on di.DataValue = d.Model inner join userlist u on d.UserID=u.UserID
                        left join GeoFence geo on geo.GeofenceID=e.GeoFenceID
                        where d.Deleted=0  and e.deleted =0 and e.Created > DATEADD(DAY,-10, DATEADD(HH,-8, GETDATE())) " + strWhere + "  order by e.Created desc  ";
                    try
                    {
                        var list = conn.QueryAsync<Devices>(strSql,
                        new
                        {
                            UserID = al.userid
                        }).Result.ToList();
                        hr.result = list;// JsonHelper.ToJson(list);
                        hr.message = "设备报警列表查询成功.";
                    }
                    catch (Exception ex)
                    {
                        hr.code = Interface.StatusCode.error;
                        hr.message = ex.Message;
                        Log.Error(this, ex);
                    }
                }
                return hr;
            });
        }

        /// <summary>
        /// 供移动端调用
        /// </summary>
        /// <param name="dl"></param>
        /// <returns></returns>
        //public async Task<IApiResult> GetDeviceList(Models.Parameter.PUsersByUserID user)
        //{
        //    return await Task.Run(() => {
        //        ApiResult hr = new IApiResult();
        //        string strSql = @"select d.DeviceID,d.SerialNumber, case when DeviceName='' then d.SerialNumber else DeviceName end DeviceName,l.LastCommunication ,l.DataContext,l.Speed,d.GroupID,d.HireExpireDate,datediff(MI,StopStartUtcDate,serverutcdate) StopTime,
        //                        (select COUNT(-1) from ExceptionMessage e where e.Deleted=0 and e.DeviceID=d.DeviceID)ExceptionCount,l.OLat Lat,l.OLng Lng,di.DataText as Model,case when di.AccountID=2 then 7 else di.SortOrder end as OffLineMinute
        //                        from devices d 
        //                        left join lklocation l on l.DeviceID = d.DeviceID inner join Dictionary di on di.DataValue=d.Model
        //                        where d.UserID = 7 and d.deleted = 0
        //                        group by d.DeviceID,d.SerialNumber,d.DeviceName,l.DataContext,l.Speed ,d.GroupID,l.LastCommunication,d.HireExpireDate,StopStartUtcDate,serverutcdate,l.OLat,l.OLng,di.DataText,d.ServerID2,di.SortOrder,di.AccountID
        //                        order by  d.DeviceName collate Chinese_PRC_CS_AS_KS_WS asc";
        //        using (System.Data.IDbConnection conn = new SqlConnection(connectionString))
        //        {
        //            var list = conn.QueryAsync<Models.Entity.Monitor.DeviceList>(strSql, new { UserID = user.userid }).Result.ToList();
        //            list.ForEach(item => {
        //                try
        //                {
        //                    string IsStop = "1"; //运动
        //                    if (item.Speed < 7.5) //速度 小于7.5 的过滤掉
        //                    {
        //                        item.Speed = 0.00;
        //                        IsStop = "0"; // 停止
        //                    }

        //                    string[] ContextList = (item.DataContext ?? "0-0-0-0").Split('-');
        //                    if (ContextList.Length == 1)
        //                    {
        //                        item.DataContext = "0-0-0-0-" + item.DataContext;
        //                        ContextList = item.DataContext.Split('-');
        //                    }
        //                    item.Status = GetDevicesStatus(item.LastCommunication, item.HireExpireDate, item.OffLineMinute);
        //                    int statusmin = 0;
        //                    if (item.Status == 2)
        //                    {
        //                        statusmin = item.LastCommunication == default(DateTime) ? 0 : (DateTime.Now - item.LastCommunication).TotalMinutes.ToString("0").toInt();
        //                    }
        //                    else if (item.Status == 4)
        //                    {
        //                        statusmin = (DateTime.Now - item.HireExpireDate).TotalMinutes.ToString("0").toInt();
        //                    }
        //                    else if (item.Status == 1 && IsStop == "0")
        //                    {
        //                        statusmin = item.StopTime ?? 0;
        //                    }
        //                    item.OffLineMinute = null;
        //                    item.GpsStatusMinute = statusmin;
        //                }
        //                catch (Exception ex)
        //                {
        //                    Log.Error(this, ex);
        //                }
        //            });
        //            hr.result = list;
        //            hr.message = "查询成功.";
        //        }
              
        //        return hr;
        //    });
        //}

        public async Task<IApiResult> GetDevicesList(Models.Parameter.P_Users.P_UsersByUserID dl)
        {
            return await Task.Run(() =>
            {
                IApiResult hr = new IApiResult();

                //count(e.ExceptionID) ExceptionCount left join ExceptionMessage e on e.DeviceID = d.deviceid

                string strSql = @"select d.DeviceID,d.SerialNumber,d.DeviceName,ISNULL(g.GroupID,-1) GroupID, ISNULL(GroupName,'Default')GroupName, d.UserID, Username,l.LastCommunication, 
                                datediff(MI,l.LastCommunication, getdate()) status,Speed,l.DataContext,l.Course,d.Icon
                                ,DATEADD(HH,8, l.DeviceUtcDate)DeviceUtcDate,datediff(MI,StopStartUtcDate,serverutcdate) StopTime,d.CarImg,d.Model,di.DataText, DATEDIFF(mi,l.lastcommunication,getdate()) OfflineTime,
                                l.DataType,DATEADD(HH,8 ,l.StopStartUtcDate)StopStartUtcDate,d.HireExpireDate,l.OLat Lat,l.OLng Lng,case when di.AccountID=2 then 7 else di.SortOrder end as offLineMi
                                from Devices d full join Groups g on g.GroupID=d.GroupID left join LKLocation l on l.DeviceID = d.DeviceID left join Dictionary di on d.Model=di.DataValue
                                where  (g.UserID = @UserID or d.UserID=@UserID) and d.Deleted !=1 order by g.GroupID desc, d.DeviceName collate Chinese_PRC_CS_AS_KS_WS  asc, StopTime, [status],OfflineTime desc ";
                using (System.Data.IDbConnection conn = new SqlConnection(connectionString))
                {
                    var list = conn.QueryAsync<Models.Entity.Monitor.DevicesList>(strSql, new { UserID = dl.userid }).Result.ToList();
                    list.ForEach((item) =>
                    {
                        if (Mgoo.CarRent.Position.ZCChinaLocation.InOutChina(item.Lat, item.Lng))
                        {
                            Position.Point point = Position.PositionUtil.gps84_To_Gcj02(item.Lat, item.Lng);
                            item.Lng = point.Lng;
                            item.Lat = point.Lat;
                        }
                    });
                    hr.result = list;
                    hr.message = $"一共查询到{list.Count}条数据.";
                } 
                return hr;
            });
        }
        public int GetDevicesStatus(DateTime LastCommunication, DateTime HireExpireDate,int? OffLineMinute)
        {
            int status = 0;
            if ( LastCommunication == null)
            {
                status = 3;  // 未激活
                return status;
            }
            if ((DateTime.Now - Convert.ToDateTime(LastCommunication)).TotalMinutes < OffLineMinute)
            {
                status = 1;  //在线
            }
            else
            {
                status =2; //离线
            }

            if (HireExpireDate  <= DateTime.Now && HireExpireDate > Convert.ToDateTime("1901-1-1 0:00:00"))
            {
                status = 4; //已过期
            }
            return status;
        }

        public async Task<IApiResult> GetGroupList(Models.Parameter.P_Users.P_UsersByUserID user)
        {
            return await Task.Run(() =>
            {
                IApiResult hr = new IApiResult(); 
                using (System.Data.IDbConnection conn = new SqlConnection(connectionString))
                {
                    string strSql = @"select GroupID,GroupName,UserID from  Groups where UserID = @UserID ";
                    var list = conn.QueryAsync<Models.Entity.Groups>(strSql, new { UserID = user.userid }).Result.ToList();

                    list.Add(new Models.Entity.Groups() { GroupID = -1, GroupName = "Default", UserID = user.userid });
                    hr.result = list; //JsonHelper.ToJson(list);

                    hr.message = $"查询到{list.Count}条数据.";
                } 
                return hr;
            });
        }
    }
}
