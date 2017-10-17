using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Return
{
   public class R_Message
    {
        /// <summary>
        /// 报警消息返回的参数
        /// </summary>
        public class GetMessageListPage_Result : R_Paging
        {
            /// <summary>
            /// 返回数据的集合
            /// </summary>
            public List<GetMessageListPage_List> list { get; set; }
            /// <summary>
            /// 列表属性说明
            /// </summary>
            public class GetMessageListPage_List
            {
                /// <summary>
                /// 报警消息ID
                /// </summary>
                public int ExceptionID { get; set; }
                /// <summary>
                ///  用户ID
                /// </summary>
                public int UserID { get; set; }
                /// <summary>
                ///  用户名称
                /// </summary>
                public string UserName { get; set; }
                /// <summary>
                /// 设备名称
                /// </summary>
                public string DeviceName { get; set; }
                /// <summary>
                /// IMEI
                /// </summary>
                public string SerialNumber { get; set; }
                /// <summary>
                /// 流量卡号
                /// </summary>
                public string PhoneNum { get; set; }
              
                /// <summary>
                /// 报警类型
                /// </summary>
                public string Message { get; set; }
                /// <summary>
                /// 报警时间
                /// </summary>
                public DateTime Created { get; set; }
                /// <summary>
                /// 行号
                /// </summary>
                public int RowIndex { get; set; }

            }
        }
    }
}
