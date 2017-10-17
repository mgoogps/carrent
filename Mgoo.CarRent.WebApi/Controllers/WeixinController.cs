using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Mgoo.CarRent.WebApi.Controllers
{
    [ AuthFilter(OnlyLogin = false)]
   public class WeixinController: WebApiBaseClass
    {
        /// <summary>
        /// 获取设备信息
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        [HttpGet]
        public Task<IApiResult> GetDeviceInfo([FromUri]Models.Parameter.P_Weixin.P_GetDeviceInfo pars)
        {
            return ApiAsync(pars, new BLL.WeixinManager.Weixin().GetDeviceInfo); 
        }

        //public Task<IApiResult> GetAppID(string code)
        //{ 
        //    return ApiAsync(code, (c)=> {
        //        return Task.Run(() =>
        //        {
        //            IApiResult ar = new IApiResult();
        //            string url = $"https://api.weixin.qq.com/sns/oauth2/access_token?appid={Common.Lib.Config.WeChat.APPID}&secret={Common.Lib.Config.WeChat.APPSECRET}&code={code}&grant_type=authorization_code";
        //           string result = Common.HttpService.Get(url);
                    
        //            return ar;
        //        });
        //    });
        //}
    }
}
