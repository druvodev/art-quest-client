import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { ScaleLoader } from "react-spinners";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axiosSecure.get(`/payments/${user?.email}`);
        const data = response.data;
        setPaymentHistory(data);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [axiosSecure, user]);

  return (
    <div>
      {loading ? (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
          <ScaleLoader color="#72deed" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          {paymentHistory.length === 0 ? (
            <p className="text-xl font-semibold ">No payment history found.</p>
          ) : (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Class Name</th>
                  <th>Price</th>
                  <th>Enrolled At</th>
                  <th>Transaction ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment._id}>
                    <td className="font-semibold">{payment.className}</td>
                    <td>${payment.price}</td>
                    <td>
                      {new Date(payment.createdAt * 1000).toLocaleString()}
                    </td>
                    <td>{payment.transactionId}</td>
                    <td>
                      <span className="badge badge-success text-white">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
