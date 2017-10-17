using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Return
{
    /// <summary>
    /// 返回数据如果是分页，则继承此类
    /// </summary>
   public class R_Paging
    {
        /// <summary>
        /// 一共多少条数据
        /// </summary>
        public int total { get; set; }
        /// <summary>
        /// 一共多少页
        /// </summary>
        public int pages { get; set; }
    }
}
