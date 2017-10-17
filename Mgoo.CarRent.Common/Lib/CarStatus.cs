using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Common.Lib
{
    /// <summary>
    /// 车辆的租赁状态
    /// </summary>
    public enum CarStatus
    {   
        /// <summary>
        /// 已申请，等待确认
        /// </summary>
        Applied = 1,
        /// <summary>
        /// 正在出租
        /// </summary>
        BeingRented =  2,
        /// <summary>
        /// 出租完成
        /// </summary>
        Complete = 3,
        /// <summary>
        /// 已拒绝
        /// </summary>
        Refuse = 4
    }
   
}
