using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Return
{
    public class R_Users
    {
        public class RGetUserList : Mgoo.CarRent.Models.Entity.Users
        {
        }

        //public class R_GetRechargeApplyList : IApiResult<R_GetRechargeApplyList.GetRechargeApplyList_Result>
        //{ 
        /// <summary>
        /// result数据.
        /// </summary>
        public class GetRechargeApplyList_Result : R_Paging
        {
            /// <summary>
            /// 返回数据的集合
            /// </summary>
            public List<GetRechargeApplyList_PageList> list { get; set; }

            /// <summary>
            /// 列表属性说明
            /// </summary>
            public class GetRechargeApplyList_PageList
            {
                /// <summary>
                /// 行号
                /// </summary>
                public int RowIndex { get; set; }
                /// <summary>
                /// 返回id
                /// </summary>
                public int RID { get; set; }
                /// <summary>
                /// 是否审核
                /// </summary>
                public bool IsCheck { get; set; }
                /// <summary>
                /// 交易银行
                /// </summary>
                public string PaymentMethod { get; set; }

                /// <summary>
                /// 交易方法
                /// </summary>
                public string TransferMethod { get; set; }
                /// <summary>
                /// 交易凭证
                /// </summary>
                public string Proof { get; set; }
                /// <summary>
                /// 交易时间
                /// </summary>
                public DateTime TransferTime { get; set; }
                /// <summary>
                /// 申请用户名
                /// </summary>
                public string UserName { get; set; }
                /// <summary>
                /// 申请用户的ID
                /// </summary>
                public int UserID { get; set; }
                /// <summary>
                /// 备注
                /// </summary>
                public string Remark { get; set; }

                /// <summary>
                /// 费用
                /// </summary>
                public double Fee { get; set; }
                /// <summary>
                /// 提交时间
                /// </summary>
                public DateTime Created { get; set; }

            }
        }
        //   }

        /// <summary>
        /// 查询分页用户列表返回的数据说明
        /// </summary>
        public class GetUsersListPage_Result : R_Paging
        {
            /// <summary>
            /// 返回数据的集合
            /// </summary>
            public List<GetUsersListPage_List> list { get; set; }
            /// <summary>
            /// 列表属性说明
            /// </summary>
            public class GetUsersListPage_List
            {
                /// <summary>
                /// 用户id
                /// </summary>
                public int UserID { get; set; }
                /// <summary>
                /// 用户名称
                /// </summary>
                public string UserName { get; set; }
                /// <summary>
                /// 登录名
                /// </summary>
                public string LoginName { get; set; }
                /// <summary>
                /// 联系人
                /// </summary>
                public string Contact { get; set; }
                /// <summary>
                /// 创建时间
                /// </summary>
                public DateTime? Created { get; set; }
                /// <summary>
                /// 一共有多少台设备
                /// </summary>
                public int AllDeviceCount { get; set; }
            
                /// <summary>
                /// 联系号码
                /// </summary>
                public string CellPhone { get; set; }
                /// <summary>
                /// 租车单价
                /// </summary>
                public int Price { get; set; }
                /// <summary>
                /// 地址
                /// </summary>
                public string Address { get; set; }
                /// <summary>
                /// 行号
                /// </summary>
                public int RowIndex { get; set; }
            }
        }
    }

}
