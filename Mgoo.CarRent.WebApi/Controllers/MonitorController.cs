
using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace Mgoo.CarRent.WebApi.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class MonitorController : WebApiBaseClass
    { 
        [HttpPost]
        //[ApiExplorerSettings(IgnoreApi = true)]

        public async Task<IApiResult> GetUserList()
        {
            return await ApiAsync(new BLL.MonitorManager.Monitor().GetUserList);
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet]
        public async Task<IApiResult> GetAlarmList(int userid)
        {
            Models.Parameter.P_Users.P_UsersByUserID al = new Models.Parameter.P_Users.P_UsersByUserID()
            {
                userid = userid
            };
            return await ApiAsync(al,new BLL.MonitorManager.Monitor().GetAlarmList);
        }

        /// <summary>
        /// 根据用户ID获取设备列表
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        //[HttpGet]
        //public async Task<IApiResult> GetDeviceList(int userid)
        //{
        //    Models.Parameter.PUsersByUserID al = new Models.Parameter.PUsersByUserID()
        //    {
        //        userid = userid
        //    };
        //    return await ApiAsync(al, new BLL.MonitorManager.Monitor().GetDeviceList);
        //}


        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet]
        public async Task<IApiResult> GetDevicesList(int userid)
        {
            Models.Parameter.P_Users.P_UsersByUserID al = new Models.Parameter.P_Users.P_UsersByUserID()
            {
                userid = userid
            };
            return await ApiAsync(al, new BLL.MonitorManager.Monitor().GetDevicesList);
        }

        [HttpGet]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IApiResult> GetGroupsList(int userid)
        {
            Models.Parameter.P_Users.P_UsersByUserID al = new Models.Parameter.P_Users.P_UsersByUserID()
            {
                userid = userid
            };
            return await ApiAsync(al, new BLL.MonitorManager.Monitor().GetGroupList);
        }

    }
}