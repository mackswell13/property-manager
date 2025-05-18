import { useForm } from "@inertiajs/react";

export default function Login({ flash }) {
  const { data, setData, post, processing, errors } = useForm({
    email_address: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/session");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 bg-white shadow-lg rounded-xl p-8">
        {/* Flash Messages */}
        {flash.alert && (
          <div className="bg-red-100 text-red-700 p-3 rounded border border-red-300 text-sm">
            {flash.alert}
          </div>
        )}
        {flash.notice && (
          <div className="bg-green-100 text-green-700 p-3 rounded border border-green-300 text-sm">
            {flash.notice}
          </div>
        )}

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email_address"
              placeholder="Enter your email address"
              autoComplete="username"
              required
              autoFocus
              value={data.email_address}
              onChange={(e) => setData("email_address", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email_address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email_address}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              maxLength={72}
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              {processing ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <a
            href="/password/new"
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}
