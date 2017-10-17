using Mgoo.CarRent.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Configuration;
using System.Data.SqlClient;
using Mgoo.CarRent.Interface;
using Mgoo.CarRent.Models.Parameter;

namespace Mgoo.CarRent.BLL.GroupManager
{
    public class Groups
    {
        private string connectionString = "";
        public Groups()
        {
            connectionString = ConfigurationManager.ConnectionStrings["conntentString"].ConnectionString;
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
        /// <summary>
        /// 加载下拉框分组内容
        /// </summary>
        /// <returns></returns>
        public Task<IApiResult> GetGroupListSimple()
        {
            return Task.Run(() =>
            {
                IApiResult ar = new IApiResult();
                try
                {
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        var query = from g in db.Groups
                                    where g.Deleted == false && g.UserID == LoginUser.userInfo.UserID
                                    select new
                                    {
                                        g.GroupID,
                                        g.GroupName
                                    };
                        var list = query.ToList();
                        ar.result = list;
                        ar.message = $"There are {list.Count} data";
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



     
        //public Task<IApiResult> GetGroupListSimple()
        //{
        //    return Task.Run(() =>
        //    {
        //        IApiResult ar = new IApiResult();
        //        try
        //        {
        //            using (DAL.CarRentEntities db = new DAL.CarRentEntities())
        //            {
        //                //var query=from g in db.Groups
        //                //           where g.Deleted == false 
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            Log.Error(this, ex);
        //            ar.message = ex.Message;
        //            ar.code = StatusCode.error;
        //        }
        //        return ar;
        //    });
        //}
    }
}
