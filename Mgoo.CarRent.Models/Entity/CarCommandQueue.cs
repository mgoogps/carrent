using System;


namespace Mgoo.CarRent.Models.Entity
{
	[Serializable]
	public class CarCommandQueue
	{
		public int ID { get; set; }

		public string DeviceID { get; set; }

		public string CommandText { get; set; }

		public DateTime CreateDate { get; set; }

		public int IsSend { get; set; }

		public DateTime SendDate { get; set; }

		public int? IsResponse { get; set; }

		public DateTime? ResponseDate { get; set; }

		public string ResponseText { get; set; }

		public string CommandName { get; set; }

		public int? IsOfflineSend { get; set; }

		public string Infos { get; set; }

		public int? SendCount { get; set; }

	}
}
