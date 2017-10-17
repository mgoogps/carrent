using Mgoo.CarRent.Common;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Mgoo.CarRent.Models.Parameter;
using Mgoo.CarRent.Interface;
using Mgoo.CarRent.Models.Return;
using System;
using System.Collections.Generic;

namespace Mgoo.CarRent.WebApi.Controllers
{
    /// <summary>
    /// 有关用户操作的API
    /// </summary>
    [AuthFilter(OnlyLogin = true)]
    public class UsersController: WebApiBaseClass
    {
        /// <summary>
        /// 获取当前用户下的所有用户
        /// </summary>
        /// <param name="userid">用户ID</param>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(Models.Return.R_Users.RGetUserList))]
        public async Task<IApiResult> GetUserList(int userid)
        {
            Models.Parameter.P_Users.P_UsersByUserID user = new Models.Parameter.P_Users.P_UsersByUserID()
            {
                userid = userid
            };
            return await ApiAsync(user, new BLL.UsersManager.Users().GetList);
        }

        /// <summary>
        /// 获取当前用户下的所有用户
        /// </summary>
        /// <param name="pars">查询参数</param>
        /// <returns></returns>
        [Route("api/Users/GetUserList/page")]
        [HttpGet]
        [ResponseType(typeof(IApiResult<Models.Return.R_Users.GetUsersListPage_Result>))]
        public async Task<IApiResult> GetUserList([FromUri]P_Users.P_GetUserListPage pars)
        {
            return await ApiAsync(pars,new BLL.UsersManager.Users().GetList);
        }
        /// <summary>
        /// 查询当前用户下所有的子用户 ，只返回，用户名和用户id两个字段
        /// </summary>
        /// <returns></returns>
        [HttpGet] 
        public async Task<IApiResult> GetUserListSimple()
        {
            return await ApiAsync(new BLL.UsersManager.Users().GetListSimple);
        }

        /// <summary>
        /// 根据ID获取用户信息
        /// </summary>
        /// <param name="userid">用户ID</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IApiResult> GetUsersInfo(int userid)
        {
            Models.Parameter.P_Users.P_UsersByUserID user = new Models.Parameter.P_Users.P_UsersByUserID()
            {
                userid = userid
            };
            return await ApiAsync(user, new BLL.UsersManager.Users().GetUserInfo);
        }

        /// <summary>
        /// 充值申请
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        [HttpPost]
        public Task<IApiResult> RechargeApply([FromBody]P_Users.P_RechargeApply pars)
        {
            return ApiAsync(pars, new BLL.UsersManager.Users().RechargeApply);
        }


        /// <summary>
        /// 获取充值申请记录
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        [HttpGet]
        //[ResponseType(typeof(Models.Return.R_Users.R_GetRechargeApplyList))]
        public Task<IApiResult<R_Users.GetRechargeApplyList_Result>> GetRechargeApplyList([FromUri]P_Users.P_GetRechargeApplyList pars)
        {
            pars.SetHost(Request.RequestUri.Host, Request.RequestUri.Port);
            return ApiAsync<P_Users.P_GetRechargeApplyList,R_Users.GetRechargeApplyList_Result>(pars, new BLL.UsersManager.Users().GetRechargeApplyList);
        }
        /// <summary>
        /// 删除单条申请记录
        /// </summary>
        /// <param name="id"> 申请记录的ID</param>
        /// <returns></returns>
        [HttpGet]
        public Task<IApiResult> DeleteRecharge(int id)
        {
            P_OnlyOneID pars = new P_OnlyOneID() { id = id };
            return ApiAsync(pars, new BLL.UsersManager.Users().DeleteRecharge);
        }
        /// <summary>
        /// 修改用户信息
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        [HttpPost] 
        public async Task<IApiResult> UpdateUsersInfo([FromBody]P_Users.P_UpdateUsersInfo pars)
        {
           return await ApiAsync(pars, new BLL.UsersManager.Users().UpdateUsersInfo);
        }
        /// <summary>
        /// 通过审核
        /// </summary>
        /// <param name="id"> 申请记录的ID</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IApiResult> ProofReview(int id)
        {
            P_OnlyOneID o = new P_OnlyOneID() {  id  = id };
            return await ApiAsync(o, new BLL.UsersManager.Users().ProofReview);
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IApiResult> UpdateUserPwd([FromBody]P_Users.P_UpdatePwd pars)
        { 
            return await ApiAsync(pars, new BLL.UsersManager.Users().UpdateUserPwd); 
        }
        /// <summary>
        /// 添加子用户
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        [HttpPost]       
        public async Task<IApiResult> AddUsers([FromBody] P_Users.P_AddUsers pars)
        {

            return await ApiAsync(pars, new BLL.UsersManager.Users().AddUsers);
        }
        /// <summary>
        /// 删除用户信息
        /// </summary>
        /// <param name="par"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IApiResult> DelUserInfo([FromUri] P_Users.P_DelUser par)
        {
            return await ApiAsync(par, new BLL.UsersManager.Users().DelUserInfo);
        }
        /// <summary>
        /// 批量删除用户信息
        /// </summary>
        /// <param name="par"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IApiResult> DelsUsersInfo([FromUri] P_Users.P_DelsUsers par)
        {
            return await ApiAsync(par, new BLL.UsersManager.Users().DelsUsersInfo);
        }
        /// <summary>
        /// 批量删除用户充值凭证
        /// </summary>
        /// <param name="par"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IApiResult> DelsApplications([FromUri] P_Users.P_DelsApplications par)
        {
            return await ApiAsync(par, new BLL.UsersManager.Users().DelsRechargeRecord);
        }
    }
}
