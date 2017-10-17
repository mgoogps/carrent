using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Parameter
{
    public class P_Message
    {
        /// <summary>
        /// 查询报警消息列表分页需要的参数
        /// </summary>
        public class P_GetMessageList : AbstractPaging, IParameterEntity
        {

            /// <summary>
            /// 用户ID
            /// </summary>
            [Range(1, int.MaxValue)]
            public int? userid { get; set; }

            /// <summary>
            /// 查询的开始时间
            /// </summary>
            public DateTime? start_date { get; set; }

            /// <summary>
            /// 查询的结束时间
            /// </summary>
            public DateTime? end_date { get; set; }

            /// <summary>
            /// 查询的关键字
            /// </summary>
            [MaxLength(30)]
            public string keyword { get; set; }

            public IApiResult Validate()
            {
                if (end_date != null)
                {
                    end_date = end_date.Value.AddDays(1).AddMilliseconds(-1);
                }
                return null;
            }
        }
        /// <summary>
        /// 删除一条消息记录
        /// </summary>

        public class P_DelMessage : IParameterEntity
        {
            /// <summary>
            /// 报警消息ID
            /// </summary>
            [Required Range(1, int.MaxValue)]
            public int exceptionid { get; set; }

            public IApiResult Validate()
            {
                return null;
            }
        }
        /// <summary>
        /// 批量删除消息记录
        /// </summary>
        public class P_DelsMessages : IParameterEntity
        {
            /// <summary>
            /// ID多条消息记录，以逗号分隔
            /// </summary>
            [Required]
            public string id { get; set; }
            public IApiResult Validate()
            {
                return null;
            }
        }

        public class P_MessageCount : IParameterEntity
        {
            /// <summary>
            /// 用户ID
            /// </summary>
            [Required Range(1, int.MaxValue)]
            public int  userid { get; set; }
            /// <summary>
            /// 起始时间
            /// </summary>
            public DateTime? start { get; set; }
            /// <summary>
            /// 结束时间
            /// </summary>
            public DateTime? end { get; set; }
            public IApiResult Validate()
            {
                return null;
            }
        }
    }
}
