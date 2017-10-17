using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using Mgoo.CarRent.Models.Parameter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace Mgoo.CarRent.WebApi.Controllers
{
    /// <summary>
    /// 有关电子围栏的一些操作API
    /// </summary>
    [AuthFilter (OnlyLogin = true)]
    public class GeofenceController : WebApiBaseClass
    {
        /// <summary>
        ///添加电子围栏（圆形） 
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        //[ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost]
        //[ResponseType(typeof(Models.Return.RGetCarRequest))]
        public async Task<IApiResult> AddGeofenceCircle(Models.Parameter.PGeofence.AddGeofenceCircle pars)
        {
            return await ApiAsync(pars, new BLL.GeofenceManager.Geofence().AddGeofenceCircle);
        }

        /// <summary>
        /// 添加电子围栏（多边形）
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        [HttpPost]
        //[ResponseType(typeof(Models.Return.RGetCarRequest))]
        public async Task<IApiResult> AddGeofencePolygon(Models.Parameter.PGeofence.AddGeofencePolygon pars)
        {
            return await ApiAsync(pars, new BLL.GeofenceManager.Geofence().AddGeofencePolygon);
        }
         
        /// <summary>
        /// 查询围栏列表
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(Models.Return.R_Geofence.R_GetGeofenceList))]
        public async Task<IApiResult> GetGeofenceList(int userid)
        {
            Models.Parameter.P_OnlyOneID oneid  = new P_OnlyOneID();
            oneid.id = userid; 
            return await ApiAsync(oneid, new BLL.GeofenceManager.Geofence().GetGeofenceList);
        }
        /// <summary>
        /// 根据围栏ID删除围栏
        /// </summary>
        /// <param name="fenceid">围栏ID</param>
        /// <returns></returns>
        [HttpGet]
        //[ResponseType(typeof(Models.Return.RGetCarRequest))]
        public async Task<IApiResult> DelGeofence(int fenceid)
        {
            Models.Parameter.P_OnlyOneID oneid = new P_OnlyOneID();
            oneid.id = fenceid;
            return await ApiAsync(oneid, new BLL.GeofenceManager.Geofence().DelGeofence);
        }
        /// <summary>
        /// 根据围栏ID查询围栏信息
        /// </summary>
        /// <param name="fenceid">围栏ID</param>
        /// <returns></returns>
        [HttpGet] 
        [ResponseType(typeof(Models.Return.R_Geofence.R_GetGeofenceByID))]
        [AuthFilter( OnlyLogin = false)]
        public async Task<IApiResult> GetGeofenceByID(int fenceid)
        {
            Models.Parameter.P_OnlyOneID oneid = new P_OnlyOneID();
            oneid.id = fenceid;
            return await ApiAsync(oneid, new BLL.GeofenceManager.Geofence().GetGeofenceByID);
        }
        /// <summary>
        /// 根据用户ID查询围栏列表
        /// </summary>
        /// <param name="userid">用户ID</param>
        /// <returns></returns>
        [HttpGet] 
        [ResponseType(typeof(Models.Return.R_Geofence.R_GetGeofenceByUserID))]
        public async Task<IApiResult> GetGeofenceByUserID(int userid)
        {
            Models.Parameter.P_OnlyOneID oneid = new P_OnlyOneID();
            oneid.id = userid;
            return await ApiAsync(oneid, new BLL.GeofenceManager.Geofence().GetGeofenceByUserID);
        }
    }
}
