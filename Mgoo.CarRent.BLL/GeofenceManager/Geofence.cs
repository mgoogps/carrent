using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mgoo.CarRent.Common;
using Mgoo.CarRent.Models.Parameter;
using Mgoo.CarRent.Interface;

namespace Mgoo.CarRent.BLL.GeofenceManager
{
    public class Geofence : LoginUser
    {
        public Task<IApiResult> AddGeofenceCircle(PGeofence.AddGeofenceCircle arg)
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                {
                    try
                    {
                        DAL.GeoFence fence = new DAL.GeoFence();
                        fence.Created = DateTime.Now;
                        fence.Deleted = false;
                        fence.FenceName = arg.name;
                        fence.DeviceID = arg.deviceid;
                        fence.Latitude = arg.latitude;
                        fence.Longitude = arg.longitude;
                        fence.Radius = Convert.ToDecimal(arg.radius.ToString("0.00"));
                        fence.FenceType = 0; // 圆形
                        fence.UserID = arg.userid;
                        fence.Description = arg.description;
                        fence.IsInclusion = -1;
                        fence.Entry = false;
                        fence.Exit = false;
                        db.GeoFence.Add(fence);
                        db.SaveChanges();
                        var geoid = fence.GeofenceID;
                        ar.message = "success!";
                    }
                    catch (Exception ex)
                    {
                        ar.code = Interface.StatusCode.error;
                        ar.message = ex.Message;
                        Log.Error(this,ex);
                    }
                }
                return ar;
            });
        }

        public Task<IApiResult> DelGeofence(P_OnlyOneID arg)
        {
            return Task.Run(() => 
            {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities ())
                    {
                        DAL.GeoFence gf = new DAL.GeoFence() { GeofenceID = arg.id };
                        db.GeoFence.Attach(gf);
                        db.GeoFence.Remove(gf);
                        var i = db.SaveChanges();
                        ar.message = $"Deleted {i} data";
                    }
                }
                catch (Exception ex)
                {
                    ar.message = ex.Message;
                    ar.code = Interface.StatusCode.error;
                } 
                return ar;
            });
        }

        public Task<IApiResult> GetGeofenceByID(P_OnlyOneID arg)
        {
            return Task.Run(()=> {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        var query = from g in db.GeoFence
                                    join u in db.Users
                                    on g.UserID equals u.UserID
                                    where g.GeofenceID == arg.id
                                    select new { g.GeofenceID, g.FenceName, g.FenceType, g.UserID, g.Bounds,u.UserName,g.Created };
                        ar.result = query.FirstOrDefault();
                        ar.result = ar.result ?? new { };
                        ar.message = "success!";
                        return ar;
                    }
                }
                catch (Exception ex)
                {
                    ar.code = StatusCode.error;
                    ar.message = ex.Message;
                    Log.Error(this,ex);
                }
                return ar;
            });
        }

        public Task<IApiResult> GetGeofenceByUserID(P_OnlyOneID arg)
        {
            return Task.Run(() => {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        var query = from g in db.GeoFence
                                    join u in db.Users
                                    on g.UserID equals u.UserID
                                    where g.UserID == arg.id
                                    select new { g.GeofenceID, g.FenceName, g.FenceType, g.UserID, g.Bounds, u.UserName, g.Created };
                        var list = query.ToList();
                        ar.result = list;
                        ar.message = $"There are { list.Count } data!";
                        return ar;
                    }
                } 
                catch (Exception ex)
                {
                    ar.code = StatusCode.error;
                    ar.message = ex.Message;
                    Log.Error(this, ex);
                }
                return ar;
            });
        }

        public Task<IApiResult> AddGeofencePolygon( PGeofence.AddGeofencePolygon arg)
        {
            return Task.Run(() =>
            {

                IApiResult ar = new IApiResult();
                try
                {
                    DAL.GeoFence fence = new DAL.GeoFence();
                    fence.Created = DateTime.Now;
                    fence.Deleted = false;
                    fence.FenceName = arg.name;
                    fence.UserID = arg.userid;
                    fence.FenceType = 1; //多边形
                    fence.Description = arg.description;
                    fence.SouthWestLat = arg.south_west_lat;
                    fence.SouthWestLng = arg.south_west_lng;
                    fence.NorthEastLat = arg.north_east_lat;
                    fence.NorthEastLng = arg.north_east_lng;
                    fence.Bounds = arg.bounds;
                    
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        db.GeoFence.Add(fence);
                        db.SaveChanges();
                        ar.message = "success!";
                    }
                }
                catch (Exception ex)
                {
                    ar.code = Interface.StatusCode.error;
                    ar.message = ex.Message;
                    Log.Error(this,ex);
                }
                return ar;
            });
        }

        public Task<IApiResult> GetGeofenceList(P_OnlyOneID arg)
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        var geos = from g in db.GeoFence
                                   where g.UserID == arg.id && g.Deleted == false
                                   select new { g.GeofenceID, g.FenceName, g.Created, g.Description };
                        var list = geos.ToList();
                        ar.result = list;
                        ar.message = $"共查询到{list.Count}条数据.";
                    }
                }
                catch (Exception ex)
                {
                    Log.Error(this,ex);
                    ar.message = ex.Message;
                    ar.code = Interface.StatusCode.error;
                } 
                return ar;
            });
        }
    }
}
