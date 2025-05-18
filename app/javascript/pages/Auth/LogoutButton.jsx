import { useForm } from "@inertiajs/react";

export default function LogoutButton() {
    const { delete: destroy, processing } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        destroy("/session");
    };

    return (
        <form onSubmit={handleLogout}>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded" type="submit" disabled={processing}>
                Log Out
            </button>
        </form>
    );
}
