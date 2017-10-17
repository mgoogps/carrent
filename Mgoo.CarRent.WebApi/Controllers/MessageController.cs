using Mgoo.CarRent.Interface;
using Mgoo.CarRent.Models.Parameter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using static Mgoo.CarRent.Models.Return.R_Message;

namespace Mgoo.CarRent.WebApi.Controllers
{
    [AuthFilter(OnlyLogin = true)]
   public class MessageController: WebApiBaseClass
    {
        /// <summary>
        /// 通过分页获取报警消息列表
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        [HttpGet]
       // [Route("api/Message/GetMessageList/page")]
        [ResponseType(typeof(IApiResult<GetMessageListPage_Result>))]
       
        public async Task<IApiResult> GetMessageList([FromUri]P_Message.P_GetMessageList pars)
        {
            return await ApiAsync(pars, new BLL.MessageManager.Message().GetMessageList);
        }
        /// <summary>
        /// 删除一条报警消息
        /// </summary>
        /// <param name="par"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IApiResult>DelMessage([FromUri]P_Message.P_DelMessage par)
        {
            return await ApiAsync(par, new BLL.MessageManager.Message().DelMessage);
        }
        /// <summary>
        /// 批量报警删除消息记录
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IApiResult> DelsMessages([FromUri]P_Message.P_DelsMessages pars)
        {
            return await ApiAsync(pars, new BLL.MessageManager.Message().DelsMessages);
        }
        /// <summary>
        /// 查询今日一共多少条报警消息
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IApiResult> GetMessageCount([FromUri]P_Message.P_MessageCount pars)
        {
            return await ApiAsync(pars, new BLL.MessageManager.Message().GetMessageCount);
        }
    }
}
