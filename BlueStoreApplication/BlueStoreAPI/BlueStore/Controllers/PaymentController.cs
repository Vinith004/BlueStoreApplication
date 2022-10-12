using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;

namespace BlueStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PaymentController : ControllerBase
    {
        private const string Key = "rzp_test_tZNC63iFJ18uPS";
        public const string secret = "Mzjwe8lSjzqd5K3vYMJmNtLf";
        private RazorpayClient _razorpayClient;

        public PaymentController()
        {
            _razorpayClient = new RazorpayClient(Key, secret);
        }

        [HttpPost]
        [Route("{amount}")]
        public IActionResult InitializePayment(string amount)
        {
            var options = new Dictionary<string, object>
        {
            { "amount", Convert.ToInt16(amount) * 100 },
            { "currency", "INR" },
            { "receipt", "recipt_1" },
            { "payment_capture", true }
        };

            var order = _razorpayClient.Order.Create(options);
            var orderId = order["id"].ToString();
            var orderJson = order.Attributes.ToString();
            return Ok(orderJson);
        }
    }
}
