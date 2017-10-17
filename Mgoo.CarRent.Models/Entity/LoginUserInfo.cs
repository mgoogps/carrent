using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Entity
{
    public enum LoginType
    {
        User = 0,
        Imei = 1
    }
    public enum MapType
    {
        BAIDU = 0,
        AMAP = 1,
        GOOGLE =2 
    }
    public class LoginUserInfo
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string LoginName { get; set; } 
        public DateTime LoginTime { get; set; } 
        public string UserType { get; set; }
        public bool SuperAdmin { get; set; }
        public string SerialNumber { get; set; }
        public MapType MapType { get; set; }
        public LoginType LoginType { get; set; }
        public string Identifies { get; set; } 
        public string Token { get; set; }
        public string DeviceID { get; set; }

        public string GetCacheKey()
        {
            return this.Identifies + this.Token;
        } 
    }
}
