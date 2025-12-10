import LogoutButton from "./Logout";

export default function DashboardPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Visão Geral</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Status da Sessão</h3>
                    <p className="mt-2 text-2xl font-bold text-green-600">Ativa & Segura</p>
                </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-md text-blue-800 text-sm">
                <p>Esta página está protegida</p>
            </div>
            <div className="pt-6">
                <LogoutButton />
            </div>
        </div>
    );
}