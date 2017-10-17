using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Interface
{
    /// <summary>
    /// 支持webapi接口返回多语言的接口
    /// </summary>
    public interface ILanguage
    {
        /// <summary>
        /// 语言编号
        /// </summary>
        string LanguageISID { get; set; }
        /// <summary>
        /// 设置语言
        /// </summary>
        /// <param name="language"></param>
        void SetLanguage(string language);

        void SetLanguage();

        /// <summary>
        /// 设置语言标记。用于自动设置语言
        /// </summary>
        void SetLanguageTag();
    }
}
