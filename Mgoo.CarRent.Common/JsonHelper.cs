using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace Mgoo.CarRent.Common
{
   public class JsonHelper
    {
        /// <summary>
        /// 将对象转换成JSON
        /// </summary>
        /// <param name="o"></param>
        /// <returns></returns>
        public static string ToJson(object o)
        {
            var setting = new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore
            };
            setting.DateFormatString = "yyyy-MM-dd HH:mm:ss";
            return JsonConvert.SerializeObject(o, setting);
        }
        /// <summary>
        /// 把JSON转换成Object
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="json"></param>
        /// <returns></returns>
        public static T ToObject<T>(string json)
        {
            return JsonConvert.DeserializeObject<T>(json);
        }
        private static string ObjectToJSON(object obj)
        {
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string @string;
            try
            {
                byte[] bytes = Encoding.UTF8.GetBytes(javaScriptSerializer.Serialize(obj));
                @string = Encoding.UTF8.GetString(bytes);
            }
            catch (Exception ex)
            {
                throw new Exception("JSONHelper.ObjectToJSON(): " + ex.Message);
            }
            return @string;
        }
        /// <summary>
        /// DataTable转换成List Dictionary 
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static List<Dictionary<string, string>> DataTableToList(DataTable dt)
        {
            List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
            foreach (DataRow dataRow in dt.Rows)
            {
                Dictionary<string, string> dictionary = new Dictionary<string, string>();
                foreach (DataColumn dataColumn in dt.Columns)
                {
                    dictionary.Add(dataColumn.ColumnName, dataRow[dataColumn.ColumnName].ToString());
                }
                list.Add(dictionary);
            }
            return list;
        }
        private static T JSONToObject<T>(string jsonText)
        {
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            T result;
            try
            {
                result = javaScriptSerializer.Deserialize<T>(jsonText);
            }
            catch (Exception ex)
            {
                throw new Exception("JSONHelper.JSONToObject(): " + ex.Message);
            }
            return result;
        }

    }
}
