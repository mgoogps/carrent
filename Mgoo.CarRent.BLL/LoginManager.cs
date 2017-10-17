using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using Mgoo.CarRent.Models.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mgoo.CarRent.Models.Parameter;

namespace Mgoo.CarRent.BLL
{
    public class LoginManager
    {
        public async Task<IApiResult> Login(Models.Parameter.PLogin pars)
        {
            return await Task.Run(() =>
            {
                IApiResult hr = new IApiResult();
                try
                {
                    string strSql = "select UserName,UserID,LoginName,UserType,SuperAdmin,PassWord from users where Deleted=0 and LoginName=@LoginName";
                    DataTable dt = DAL.DBHelper.ExecuteDataTable(strSql, new SqlParameter[] { new SqlParameter("LoginName", pars.login_name) });
                    if (dt.Rows.Count == 1)
                    {
                        DataRow loginUserDic = dt.Rows[0];
                        string EncryptPWD = Common.CryptographyUtil.GetMD5(loginUserDic["PassWord"].toStringEmpty());

                        if (pars.login_password.Equals(EncryptPWD.ToLower()))
                        {
                            #region MyRegion 
                            LoginUserInfo _loginUserInfo = new LoginUserInfo();
                            _loginUserInfo.UserID = loginUserDic["UserID"].toStringEmpty().toInt();
                            _loginUserInfo.UserName = loginUserDic["UserName"].toStringEmpty();
                            _loginUserInfo.LoginName = loginUserDic["LoginName"].toStringEmpty();
                            _loginUserInfo.UserType = loginUserDic["UserType"].toStringEmpty();
                            _loginUserInfo.SuperAdmin = loginUserDic["SuperAdmin"].toStringEmpty().Equals("1");
                            _loginUserInfo.LoginTime = DateTime.Now;
                            _loginUserInfo.LoginType = LoginType.User;
                            _loginUserInfo.Token = Guid.NewGuid().ToString().Replace("-", "").ToLower();
                            _loginUserInfo.Identifies = pars.identifies;
                            if (pars.identifies.Split('@').Length == 2)
                            {
                                string mt = pars.identifies.Split('@')[1];
                                switch (mt)
                                {
                                    case "BAIDU":
                                        _loginUserInfo.MapType = MapType.BAIDU;
                                        break;
                                    case "AMAP":
                                        _loginUserInfo.MapType = MapType.AMAP;
                                        break;
                                    case "GOOGLE":
                                        _loginUserInfo.MapType = MapType.GOOGLE;
                                        break;
                                    default:
                                        _loginUserInfo.MapType = MapType.AMAP;
                                        break;
                                }
                            }
                            else
                            {
                                _loginUserInfo.MapType = MapType.AMAP;
                            }
                            #endregion

                            Log.Info(this, pars.login_name, pars.identifies);

                            CacheHelper.Insert(_loginUserInfo.GetCacheKey(), _loginUserInfo, 20);

                            hr.code =  StatusCode.success;
                            hr.message = "登录成功.";
                            hr.result = new
                            {
                                url = "index.html",
                                userid = _loginUserInfo.UserID,
                                token = _loginUserInfo.Token,
                                username = _loginUserInfo.UserName
                            };
                        }
                        else
                        {
                            hr.code =  StatusCode.parameterError;
                            hr.message = "密码错误.";
                        }
                    }
                    else
                    {
                        hr.code =  StatusCode.failure;
                        hr.message = "账号或密码错误.";
                        hr.result = new { };
                    }
                }
                catch (Exception ex)
                {
                    Log.Error(this,ex);
                    hr.message = ex.Message;
                    hr.code = Interface.StatusCode.error;
                }
                return hr;// new HttpResult() { code= HttpResult.StatusCode.failure, message ="登录失败." }; 
            });
        }
        /// <summary>
        /// 发送验证码
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        public Task<IApiResult> SendSMS(P_SendCode arg)
        {
            return Task.Run(() => 
            {
                var ar =new IApiResult();
                int SecurityCode = new Random().Next(100000, 999999);
                var message = "Your verification code is:"+ SecurityCode;
                if (arg.type == 1)
                {

                }
                else if(arg.type == 2)
                {

                }
                return  Common.SMSHelper.Send(arg.phone, message);
                
            });
        }
        /// <summary>
        /// 注册用户信息
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>

        public async Task<IApiResult> Register(Mgoo.CarRent.Models.Parameter.PRegister arg)
        {
            return await Task.Run (()=>
            {
                var ar = new IApiResult();
                try
                {
                    DAL.Users user = new DAL.Users();
                    user.Created = DateTime.Now;
                    user.UpdateTime = DateTime.Now;
                    user.UserName = arg.username;
                    user.Password = arg.password;
                    user.LoginName = arg.phone;
                    user.UserType = 2;
                    user.ParentID = 1;
                    user.CellPhone = arg.phone;
                    user.TimeZone = "China Standard Time";
                    user.Deleted = false;
                    user.SuperAdmin = 0;
                    user.Gender = false;
                    user.MoneyCount = 0;
                    using (DAL.CarRentEntities db = new DAL.CarRentEntities())
                    {
                        db.Users.Add(user);
                        db.SaveChanges();
                    }
                    ar.message = "success!";
                }
                catch (Exception ex)
                {
                    Log.Error(this,ex);
                    ar.message = ex.Message;
                    ar.code = StatusCode.error;
                }
                return ar; 
            }); 
        }
    }
}
