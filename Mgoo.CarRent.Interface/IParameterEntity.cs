
using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Interface
{
    /// <summary>
    /// 参数类需要继承此类
    /// </summary>
    public interface IParameterEntity<T>
    {
        /// <summary>
        /// 必须实现验证参数是否正确的方法
        /// </summary>
        /// <returns></returns>
        IApiResult<T> Validate();
    }
    public interface IParameterEntity
    {
        /// <summary>
        /// 必须实现验证参数是否正确的方法
        /// </summary>
        /// <returns></returns>
        IApiResult Validate();
    }


    // public abstract class AbstractParameter
    // {
    //private int userID;

    //private int mapType;
    //private object currentUser;
    //public void SetCurrentUser(int userid, int maptype)
    //{
    //    this.userID = userid;
    //    this.mapType = maptype;
    //}
    //public int GetUserID()
    //{
    //    return this.userID;
    //}
    //public int GetMapType()
    //{
    //    return this.mapType;
    //}

    //public void SetCurrentUserInfo(object userinfo)
    //{
    //    this.currentUser = userinfo;
    //}

    //public object GetCurrentUserInfo()
    //{
    //    return this.currentUser;
    //}

    //public virtual bool OnlyLogin()
    //{
    //    return true;
    //}

    // }
}
