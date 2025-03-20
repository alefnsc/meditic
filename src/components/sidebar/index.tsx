import { FileText, Home, User, Settings, LogOut } from 'lucide-react';


const Sidebar = ({ onShowApiKeyModal }: { onShowApiKeyModal: () => void }) => (
    <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-blue-600">MEDITIC</h1>
        </div>

        <nav className="p-4">
            <ul className="space-y-2">
                <li>
                    <button className="flex items-center w-full p-3 rounded bg-blue-100 text-blue-800">
                        <FileText size={20} className="mr-3" />
                        <span>Consultations</span>
                    </button>
                </li>

                <li>
                    <button
                        className="flex items-center w-full p-3 rounded hover:bg-blue-50 text-gray-700"
                        onClick={onShowApiKeyModal}
                    >
                        <Settings size={20} className="mr-3" />
                        <span>API Settings</span>
                    </button>
                </li>
            </ul>
        </nav>

    </aside>
);

export default Sidebar;