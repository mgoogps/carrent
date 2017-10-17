using System;
using System.Runtime.Serialization;

namespace Mgoo.CarRent.Models.Entity
{
 
	public class Users
	{
        /// <summary>
        /// 用户ID
        /// </summary>
		public int UserID { get; set; }
        /// <summary>
        /// 父级ID
        /// </summary>
		public int? ParentID { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
		public string UserName { get; set; }

        /// <summary>
        /// 登录名
        /// </summary>
		public string LoginName { get; set; }

        /// <summary>
        /// 登录密码
        /// </summary>
		public string Password { get; set; }

        /// <summary>
        /// 用户类型
        /// </summary>
		public int? UserType { get; set; }

        /// <summary>
        /// 
        /// </summary>
		public int? Gender { get; set; }

		public string FirstName { get; set; }

		public string MiddleName { get; set; }

		public string LastName { get; set; }

		public string TimeZone { get; set; }

		public string Address1 { get; set; }

		public string Address2 { get; set; }

		public int? Country { get; set; }

		public int? State { get; set; }

		public string HomePhone { get; set; }

		public string WorkPhone { get; set; }

		public string CellPhone { get; set; }

		public string SMSEmail { get; set; }

		public string PrimaryEmail { get; set; }

		public string SecondaryEmail { get; set; }

		public int? Status { get; set; }

		public DateTime? UpdateTime { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
		public DateTime? Created { get; set; }

		public int? Deleted { get; set; }

		public int? SuperAdmin { get; set; }

		public int? AllDeviceCount { get; set; }

		public int? ActivationCount { get; set; }

		public int? MoneyCount { get; set; }

	}
}
