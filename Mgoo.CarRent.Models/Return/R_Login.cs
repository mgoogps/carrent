namespace Mgoo.CarRent.Models.Return
{
    /// <summary>
    /// 登录返回值
    /// </summary>
    public class R_Login :Interface.IApiResult<Login_Result>
    {
        //public new resultData result { set; get; }
    }
    public class Login_Result
    {
        /// <summary>
        /// 要跳转的URL
        /// </summary>
        public string url { get; set; }
        /// <summary>
        /// 用户ID
        /// </summary>
        public string userid { get; set; }
        /// <summary>
        /// 令牌
        /// </summary>
        public string token { get; set; }
        /// <summary>
        /// 用户名称
        /// </summary>
        public string username { get; set; }
    }

}
