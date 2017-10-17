using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Caching;

namespace Mgoo.CarRent.Common
{
    public class CacheHelper
    {
       // public static string CacheKey = "login_user_info";
        public static void Insert(string key, object obj)
        {
            HttpRuntime.Cache.Insert(key, obj);
        }

        public static void Remove(string key)
        {
            HttpRuntime.Cache.Remove(key);
        }

        public static void Insert(string key, object obj, string fileName)
        {
            CacheDependency dependencies = new CacheDependency(fileName);
            HttpRuntime.Cache.Insert(key, obj, dependencies);
        }

        public static void Insert(string key, object obj, int expires)
        {
            HttpRuntime.Cache.Insert(key, obj, null, Cache.NoAbsoluteExpiration, new TimeSpan(0, expires, 0));
        }

        public static object Get(string key)
        {
            if (string.IsNullOrEmpty(key))
            {
                return null;
            }
            return HttpRuntime.Cache.Get(key);
        }

        public static T Get<T>(string key =null)
        {
            try
            {
                object obj = CacheHelper.Get(key);
                if (obj != null)
                {
                    return (T)((object)obj);
                }
                return default(T);
            }
            catch (Exception)
            {
                return default(T);
            } 
        }
    }
}
