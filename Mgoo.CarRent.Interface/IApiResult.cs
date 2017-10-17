using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Interface
{
    /// <summary>
    /// webapi 统一 返回泛型类
    /// </summary>
    public class IApiResult <T>
    {
        /// <summary>
        /// 状态码
        /// </summary>
        public StatusCode code { set; get; }

        /// <summary>
        /// 说明
        /// </summary>
        public string message { set; get; } = string.Empty;

        /// <summary>
        /// 返回值
        /// </summary>
        public T result { set; get; } = default(T);
         
    }
    /// <summary>
    /// weiapi 统一返回非泛型类
    /// </summary>
    public class IApiResult
    {
        /// <summary>
        /// I状态码
        /// </summary>
        public StatusCode code { set; get; }

        /// <summary>
        /// I说明
        /// </summary>
        public string message { set; get; } = string.Empty;

        /// <summary>
        /// I返回值
        /// </summary>
        public object result { set; get; } = string.Empty;

    }
}
