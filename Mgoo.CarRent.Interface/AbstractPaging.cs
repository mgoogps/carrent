using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Interface
{
   public abstract  class AbstractPaging
    {
        /// <summary>
        /// 当前页
        /// </summary>
        [Required,Range(1,int.MaxValue)]
        public int p { get; set; }
        /// <summary>
        /// 一页多少条
        /// </summary>
        [Required, Range(1, int.MaxValue)]
        public int pagesize { get; set; }
    }
}
