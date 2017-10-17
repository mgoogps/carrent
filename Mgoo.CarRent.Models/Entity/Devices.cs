using System;


namespace Mgoo.CarRent.Models.Entity
{
	[Serializable]
	public class Devices
	{
        public Users Users { get; set; }
        public ExceptionMessage ExceptionMessage { get; set; }
        public Dictionary Dictionary { get; set; }
        public string  UserName { get; set; }
        public DateTime ExceptionCreated { get; set; }
        public string ExceptionID { get; set; }
        public string Message { get; set; }
        public int NotificationType { get; set; }
        public string DataText { get; set; }

        public LKLocation LKLocation { get; set; }

        public int DeviceID { get; set; }

		public string SerialNumber { get; set; }

		public string DeviceName { get; set; }

		public string DevicePassword { get; set; }

		public string CarUserName { get; set; }

		public string CarNum { get; set; }

		public string CellPhone { get; set; }

		public int? Status { get; set; }

		public string PhoneNum { get; set; }

		public string Model { get; set; }

		public string Description { get; set; }

		public DateTime? Created { get; set; }

		public int? Deleted { get; set; }

		public DateTime? ActiveDate { get; set; }

		public DateTime? HireStartDate { get; set; }

		public DateTime? HireExpireDate { get; set; }

		public decimal? SpeedLimit { get; set; }

		public int? UserID { get; set; }

		public int? GroupID { get; set; }

		public string Icon { get; set; }

		public float? OILCoefficient { get; set; }

		public string BSJIP { get; set; }

		public int? AddHireDay { get; set; }

		public int? ServerID { get; set; }

		public decimal? OilPrice { get; set; }

		public DateTime? CreatedByUser { get; set; }

		public DateTime? ExpireByUser { get; set; }

		public decimal? OilVolume { get; set; }

		public decimal? OilLow { get; set; }

		public decimal? OilHigh { get; set; }

		public string CarImg { get; set; }

		public int? ServerID2 { get; set; }

		public decimal? ByDistance { get; set; }

		public decimal? LastByDistance { get; set; }

	}
}
