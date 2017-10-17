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
    [AuthFilter(OnlyLogin = true)]
    public  class GroupsController: WebApiBaseClass
    {
        /// <summary>
        /// 查询分组列表
        /// </summary>
        /// <param name="userid">用户ID</param>
        /// <returns></returns>
        [HttpGet] 
        [ResponseType(typeof(Models.Return.RGetGroupList))]
        public async Task<IApiResult> GetGroupList(int userid)
        {
            Models.Parameter.P_Users.P_UsersByUserID al = new Models.Parameter.P_Users.P_UsersByUserID()
            {
                userid = userid
            };
            return await ApiAsync(al, new BLL.GroupManager.Groups().GetGroupList);
        }
        /// <summary>
        /// 加载下拉框分组内容
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IApiResult> GetGroupListSimple()
        {

            return await ApiAsync( new BLL.GroupManager.Groups().GetGroupListSimple);
        }
    }
}
