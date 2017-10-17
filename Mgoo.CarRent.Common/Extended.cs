using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace Mgoo.CarRent.Common
{
    /// <summary>
    /// 封装一些扩展方法
    /// </summary>
    public static class Extended
    {
        /// <summary>
        /// 返回当前Object的string，如为null则返回空 
        /// </summary>
        /// <param name="strRes"></param>
        /// <returns></returns>
        public static string toStringEmpty(this Object strRes)
        {
            if (strRes == null)
                return string.Empty;
            else
                return strRes.ToString();
        }

        /// <summary>
        /// 将DataTable转换成ListDictionary格式
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public static List<Dictionary<string, string>> toListDictionary(this DataTable table)
        {
            List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
            foreach (DataRow row in table.Rows)
            {
                Dictionary<string, string> dic = new Dictionary<string, string>();
                foreach (DataColumn c in table.Columns)
                {
                    dic[c.ColumnName] = row[c.ColumnName].toStringEmpty();
                }
                list.Add(dic);
            }
            return list;
        }

        /// <summary>
        /// 把DataTable第一行数据转换成Dictionary
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public static Dictionary<string, string> toDictionary(this DataTable table)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            foreach (DataRow row in table.Rows)
            {
                foreach (DataColumn c in table.Columns)
                {
                    dic[c.ColumnName] = row[c.ColumnName].toStringEmpty();
                }
                break;
            }
            return dic;
        }
        /// <summary>
        /// 把字符串转换成Dictionary字典
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static Dictionary<string, string> toDictionary(this string json)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Deserialize<Dictionary<string, string>>(json);
           // return Utils.ToDictionary(json);
        }
        public static double toDouble(this string strRes)
        {
            if (string.IsNullOrEmpty(strRes))
                return 0.0;
            else
                return Convert.ToDouble(strRes);
        }
        public static int toInt(this CarRent.Common.Lib.CarStatus status)
        {
           return (int)status;
        }
        public static int toInt(this string strRes)
        {
            if (strRes == null)
                return 0;
            else
                return Convert.ToInt32(strRes);
        }
        public static DateTime toDateTime(this string strRes)
        {
            return Convert.ToDateTime(strRes);
        }
    }
}
