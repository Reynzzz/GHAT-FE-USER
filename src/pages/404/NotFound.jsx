import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  // // Fungsi untuk melakukan redirect ke dashboard setelah 5 detik
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      const timeout = setTimeout(() => {
        navigate("/");
        // Ganti dengan path dashboard yang sesuai
      }, 3000); // Waktu dalam milidetik (5 detik)

      return () => clearTimeout(timeout);
    }
    if (localStorage.getItem("access_token")) {
      const timeout = setTimeout(() => {
        navigate("/dashboard");
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [navigate]);

  return (
    <div>
      <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
				<span className="sr-only">Error</span>404
			</h2>
			<p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
			<p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
			{/* <a rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Back to homepage</a> */}
		</div>
	</div>
</section>
    </div>
  );
};

export default NotFound;
