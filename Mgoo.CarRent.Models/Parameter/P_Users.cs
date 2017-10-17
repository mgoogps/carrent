using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mgoo.CarRent.Common;
using System.ComponentModel.DataAnnotations;

namespace Mgoo.CarRent.Models.Parameter
{
    public class P_Users
    { 
        /// <summary>
        /// 根据用户ID获取用户列表的参数
        /// </summary>
        public class P_UsersByUserID :  IParameterEntity
        {
            /// <summary>
            /// 用户id
            /// </summary>
            [Required,Range(1,int.MaxValue)]
            public int userid { get; set; }
 
            IApiResult IParameterEntity.Validate()
            {
                //if (userid == null || userid <= 0)
                //{
                //    return new IApiResult() { code = StatusCode.parameterError };
                //}
                return null;
            }
        }

        /// <summary>
        /// 充值申请接口参数
        /// </summary>
        public class P_RechargeApply :  IParameterEntity
        {
            /// <summary>
            /// 证明，收据（base64格式）
            /// </summary>
            [Required]
            public string proof{ get; set; }
            /// <summary>
            /// 充值金额，单位为马来西亚最小面值：Cents(相当于RMB的分)，页面显示用Ringgit(相当于RMB的元)，1 Ringgit=100 Cents
            /// </summary>
            [Required,Range(1,1000000)]
            public int money { get; set; }
            /// <summary>
            /// 转账时间
            /// </summary>
            [Required]
            public DateTime transfer_time { get; set; }

            /// <summary>
            /// 交易方式（参考值：ATM ，Online transfer ，Counter）
            /// </summary>
            [Required,MinLength(2),MaxLength(20)]
            public string transfer_method { get; set; }

            /// <summary>
            /// 充值银行（参考值：MayBank，PublicBank）
            /// </summary>
            [Required, MinLength(2), MaxLength(50)]
            public string payment_method { get; set; }
            
            /// <summary>
            /// 备注
            /// </summary>
            public string remark { get; set; }

            public IApiResult Validate()
            {
                //data:image/gif;base64,
                //if (!proof.StartsWith("data:image/") || proof.Length < 200)
                //{
                //    return new IApiResult() { code = StatusCode.parameterError, message = "proof parameter error..." };
                //}
                string[] imgs = new string[] { "data:image/png;base64,", "data:image/gif;base64,", "data:image/jpeg;base64,", "data:image/jpg;base64,", "data:image/bmp;base64," };
                IEnumerable<string> images = imgs.Where((i) => proof.StartsWith(i));
                if (images.Count() != 1)
                {
                    return new IApiResult() { code = StatusCode.parameterError, message = "unsupported image format..." };
                }
                proof = proof.Replace(images.First(), "");

                string[] tm = new string[] { "atm", "online transfer", "counter" };
                if (!tm.Contains(transfer_method.ToLower()))
                {
                    return new IApiResult() { code = StatusCode.parameterError, message = "transfer_method parameter error..." };
                }
                string[] pm = new string[] { "maybank", "publicbank" };
                if (!pm.Contains(payment_method.ToLower()))
                {
                    return new IApiResult() { code = StatusCode.parameterError, message = "payment_method parameter error..." };
                }
                return null;
            }
        }

        /// <summary>
        /// 获取充值申请列表
        /// </summary>
        public class P_GetRechargeApplyList : AbstractPaging, IParameterEntity
        {
            /// <summary>
            /// 用户ID
            /// </summary>
            [Range(0, int.MaxValue)]
            public int userid { get; set; } = 0;
            /// <summary>
            /// 默认是2，查询所有的，1：查询已审核，0：未审核
            /// </summary>
            [Range(0, 2)]
            public int type { get; set; } = 2;
            /// <summary>
            /// 开始时间（transfer time）
            /// </summary>
            public DateTime? start_time { get; set; }
            /// <summary>
            /// 开始时间（transfer time）
            /// </summary>
            public DateTime? end_time { get; set; }
            /// <summary>
            /// 转账方法（参考值：ATM ，Online transfer ，Counter）
            /// </summary>
            public string transfer_method { get; set; }


            private int port { get; set; }
            private string host { get; set; }


            public IApiResult Validate()
            {
                return null;
            }

            public void SetHost(string host,int port)
            {
                this.port = port;
                this.host = host;
            }
            public void GetHost(out string _host,out int _port)
            { 
                _host = "http://"+ this.host;
                _port = this.port;
            }
        }

        /// <summary>
        /// 修改用户信息的参数
        /// </summary>

        public class P_UpdateUsersInfo: IParameterEntity
        {
            ///// <summary>
            ///// 用户ID
            ///// </summary>
            [Range(1, int.MaxValue)]
            public int userid { get; set; }
            /// <summary>
            /// 用户名
            /// </summary>
            [Required, MaxLength(20)]
            public string username { get; set; }
            /// <summary>
            /// 联系电话
            /// </summary> 
            [Required,MinLength(5),  MaxLength(16)]
            public string phone { get; set; }
          
            /// <summary>
            /// 租车的单价，多少钱一个小时，单位：Cents(相当于RMB的分)，页面显示用Ringgit(相当于RMB的元)，1 Ringgit=100 Cents
            /// </summary>
            [Required, Range(100,100000)]
            public int price { get; set; }
            /// <summary>
            /// 联系人
            /// </summary>
            [MaxLength(20)]   
            public string contact { get; set; }

            /// <summary>
            /// Email
            /// </summary>
            [MaxLength(30)]
            public string email { get; set; }
            /// <summary>
            /// 地址
            /// </summary>
            [MaxLength(100)]
            public string address { get; set; }
            public IApiResult Validate()
            {
                if (price * 100 > 100000)
                {
                    return new IApiResult() { code = StatusCode.parameterError, message = "The amount should not exceed 100,000" };
                }
                return null;
            }
        }
    
        /// <summary>
        /// 修改用户密码
        /// </summary>
        public class P_UpdatePwd: IParameterEntity
        {
            /// <summary>
            /// 用户ID
            /// </summary>
            [Required,Range(1, int.MaxValue)]
            public int userid { get; set; }

            /// <summary>
            /// 原始密码
            /// </summary>
            [Required,MinLength(6),MaxLength(20)]
            public string old_userpwd { get; set; }
            /// <summary>
            /// 新密码
            /// </summary>
            [Required, MinLength(6), MaxLength(20)]
            public string new_userpwd { get; set; }
            /// <summary>
            /// 确认密码
            /// </summary>
            [Required, MinLength(6), MaxLength(20)]
            public string confirm_userpwd { get; set; }

            public IApiResult Validate()
            {
                if (this.new_userpwd != this.confirm_userpwd)
                { 
                    return new IApiResult() { code= StatusCode.parameterError, message= "Entered passwords differ." };
                }
                return null;
            }
        }

        /// <summary>
        /// 获取用户列表分页功能 查询需要的字段
        /// </summary>
        public class P_GetUserListPage :  AbstractPaging, IParameterEntity
        {
            /// <summary>
            /// 根据创建时间查询的开始时间
            /// </summary>
            public DateTime? start_date { get; set; }
            /// <summary>
            /// 根据创建时间查询的结束时间
            /// </summary>
            public DateTime? end_date { get; set; }
            /// <summary>
            /// 关键字
            /// </summary>
            public string keyword { get; set; }

            public IApiResult Validate()
            {
                return null;
            }
        }
        /// <summary>
        /// 添加子用户信息
        /// </summary>
        public class P_AddUsers:IParameterEntity
        {
            /// <summary>
            /// 用户名称
            /// </summary>
            [Required]
            public string username { get; set; }
            /// <summary>
            /// 登陆名称
            /// </summary>
            [Required,MinLength(3),MaxLength(15)]
            public string account { get; set; }
            /// <summary>
            /// 联系人
            /// </summary>
            public string contact { get; set; }
            /// <summary>
            /// 手机号
            /// </summary>
            [Required, MinLength(5), MaxLength(16)]
            public string phone { get; set; }
            /// <summary>
            /// 租车的单价，多少钱一个小时，单位：Cents(相当于RMB的分)，页面显示用Ringgit(相当于RMB的元)，1 Ringgit=100 Cents
            /// </summary>
            [Required, Range(100, 100000)]
            public int price { get; set; }
            /// <summary>
            /// 地址
            /// </summary>
            public string address { get; set; }
            /// <summary>
            /// email
            /// </summary>
            public string email { get; set; }

            public IApiResult Validate()
            {
                if (price*100> 100000)
                {
                    return new IApiResult() { code = StatusCode.parameterError, message = "The amount should not exceed 100,000" };
                }
                return null;
            }
        }

        /// <summary>
        /// 删除子用户
        /// </summary>
        public class P_DelUser : IParameterEntity
        {
            /// <summary>
            /// 用户ID
            /// </summary>
            [Required Range(1, int.MaxValue)]
            public int userid { get; set; }
            public IApiResult Validate()
            {
                return null;
            }
        }
        /// <summary>
        /// 批量删除用户信息
        /// </summary>
        public class P_DelsUsers:IParameterEntity
        {
            /// <summary>
            /// 用户ID 3,4,5格式
            /// </summary>
            public string id { get; set; }

            public IApiResult Validate()
            {
                return null;
            }
        }
        /// <summary>
        /// 批量删除用户充值凭证记录
        /// </summary>
        public class P_DelsApplications : IParameterEntity
        {
            /// <summary>
            /// RID
            /// </summary>
            public string id { get; set; }
            public IApiResult Validate()
            {
                return null;
            }
        }
    }
  
}
