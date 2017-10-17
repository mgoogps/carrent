using Mgoo.CarRent.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.BLL
{
    /// <summary>
    /// 存储当前登陆用户的信息 ，全局都可以访问
    /// </summary>
    public class LoginUser
    {
        /// <summary>
        /// 当前用户的信息
        /// </summary>
        public static LoginUserInfo userInfo = new LoginUserInfo();

        private LoginUserInfo _user;

        public LoginUserInfo User
        {
            get
            {
                return _user;
            }

            set
            {
                _user = value;
            }
        }
    }
}
