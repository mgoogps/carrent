using Mgoo.CarRent.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Mgoo.CarRent.Models.Parameter;
using Mgoo.CarRent.Interface;
using System.Web.Http.Description;
using static Mgoo.CarRent.Models.Return.R_Devices.GetDeviceListPage;

namespace Mgoo.CarRent.WebApi.Controllers
{
    /// <summary>
    /// 有关设备操作的API
    /// </summary>
    [AuthFilter(OnlyLogin = true)]
    public class DevicesController : WebApiBaseClass
    {
        /// <summary>
        /// 获取用户下的所有设备列表
        /// </summary>
        /// <param name="userid">用户ID</param>
        /// <returns>   </returns>
        [HttpGet]
        [ResponseType(typeof(Models.Return.RGetDeviceList))]
        //[Route("api/Devices/GetDeviceList")] 
        public async Task<IApiResult> GetDeviceList(int userid)
        {
            Models.Parameter.P_Users.P_UsersByUserID user = new Models.Parameter.P_Users.P_UsersByUserID()
            {
                userid = userid
            };
            return await ApiAsync(user, new BLL.DeviceManager.Device().GetList);
        }

        /// <summary>
        /// 通过分页获取设备列表
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/Devices/GetDeviceList/page")]
        [ResponseType(typeof(IApiResult<GetDeviceListPage_Result>))]
        [AuthFilter(OnlyLogin = true)]
        public async Task<IApiResult> GetDeviceList([FromUri]P_Devices.P_GetDeviceList pars  )
        {
          
            return await ApiAsync(pars,new BLL.DeviceManager.Device().GetDeviceList);
        }

        /// <summary>
        /// 根据设备ID获取设备信息
        /// </summary>
        /// <param name="deviceid"></param>
        /// <returns></returns>
        [HttpGet]
         [ResponseType(typeof(Models.Return.R_Devices.GetDevice_Result ))]
        [AuthFilter(OnlyLogin = true)]
        public async Task<IApiResult> GetDeviceByDeviceID(int deviceid)
        {
            Models.Parameter.P_Devices.PDevicesByDeviceID user = new Models.Parameter.P_Devices.PDevicesByDeviceID()
            {
                deviceid = deviceid
            };
            return await ApiAsync(user, new BLL.DeviceManager.Device().GetDevice);
        }

        /// <summary>
        /// 租车申请 (顺序： 用户先 申请租车 > 商家APP获取租车列表 > 确认租车(开始计费) > 结束租车(结算费用))
        /// </summary>
        /// <param name="pars">请求参数</param>
        /// <returns></returns>
        [HttpPost]
        [ResponseType(typeof(Models.Return.RCarRequest))]
        [AuthFilter( OnlyLogin = false)]
        public async Task<IApiResult> CarRequest([FromBody]Models.Parameter.P_Devices.P_CarRequest pars)
        { 
            return await ApiAsync(pars, new BLL.DeviceManager.Device().CarRequest);
        }

        /// <summary>
        /// 获取租车申请列表 (顺序： 用户先 申请租车 > 商家APP获取租车列表 > 确认租车(开始计费) > 结束租车(结算费用))
        /// </summary>
        /// <param name="userid">用户ID</param>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(Models.Return.RGetCarRequest))]
        public async Task<IApiResult> GetCarRequestList(int userid)
        {
            P_Users.P_UsersByUserID pars = new P_Users.P_UsersByUserID()
            {
                userid = userid
            };
            return await ApiAsync(pars, new BLL.DeviceManager.Device().GetCarRequest);
        }

        /// <summary>
        /// 确认租车(开始计时收费) (顺序： 用户先 申请租车 > 商家APP获取租车列表 > 确认租车(开始计费) > 结束租车(结算费用))
        /// </summary>
        /// <param name="leaseid">租车申请列表的id</param>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(Models.Return.RGetCarRequest))]
        public async Task<IApiResult> StartRental(int leaseid)
        {
            P_OnlyOneID only = new P_OnlyOneID();
            only.id = leaseid;
            return await ApiAsync(only, new BLL.DeviceManager.Device().StartRental);
        }

        /// <summary>
        /// 结束租车（结算费用） (顺序： 用户先 申请租车 > 商家APP获取租车列表 > 确认租车(开始计费) > 结束租车(结算费用))
        /// </summary>
        /// <param name="deviceid">设备ID</param>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(Models.Return.RGetCarRequest))]
        public async Task<IApiResult> EndRental(int deviceid)
        {
            P_Devices.PDevicesByDeviceID pars = new P_Devices.PDevicesByDeviceID
            {
                deviceid = deviceid
            };
            return await ApiAsync(pars, new BLL.DeviceManager.Device().EndRental);
        }
        /// <summary>
        /// 根据设备ID查询设备信息
        /// </summary>
        /// <param name="deviceid"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IApiResult> GetDeviceInfo(int deviceid) {
            P_Devices.PDevicesByDeviceID pars = new P_Devices.PDevicesByDeviceID
            {
                deviceid = deviceid
            };
            return await ApiAsync(pars, new BLL.DeviceManager.Device().GetDeviceInfo);
        }

        /// <summary>
        /// 修改设备信息
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns> 
        [HttpPost]
        public async Task<IApiResult> UpdateDeviceInfo([FromBody] P_Devices.P_UpdateDeviceInfo pars)
        {
            
            return await ApiAsync(pars, new BLL.DeviceManager.Device().UpdateDeviceInfo);
        }
        /// <summary>
        /// 删除一条设备信息记录
        /// </summary>
        /// <param name="par"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IApiResult> DelDevice([FromUri] P_Devices.P_DelDevice par)
        {

            return await ApiAsync(par, new BLL.DeviceManager.Device().DelDevice);
        }
        /// <summary>
        /// 批量删除设备
        /// </summary>
        /// <param name="par"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IApiResult> DelsDevices([FromUri] P_Devices.P_DelsDevices par)
        {

            return await ApiAsync(par, new BLL.DeviceManager.Device().DelsDevices);
        }

        /// <summary>
        /// 添加设备
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IApiResult> AddDevice([FromBody] P_Devices.P_AddDevice pars)
        {

            return await ApiAsync(pars, new BLL.DeviceManager.Device().AddDevice);
        }
    }
}
