using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Return
{
    public class RGetGroupList : IApiResult
    {
        /// <summary>
        /// 分组ID
        /// </summary>
        public int GroupID { get; set; }

        /// <summary>
        /// 分组名称
        /// </summary>
        public string GroupName { get; set; }

        /// <summary>
        /// 用户ID
        /// </summary>
        public int UserID { get; set; }
    }
}
