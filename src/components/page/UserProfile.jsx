export default function UserProfile() {
    return (
        <div className="p-6 bg-base-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-4xl text-primary">👤</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">John Doe</h3>
                        <p className="text-base-content/70">john.doe@example.com</p>
                    </div>
                </div>
                <div className="pt-4 border-t border-base-300">
                    <h4 className="text-lg font-semibold mb-2">Profile Information</h4>
                    <p className="text-base-content/70">
                        Member since: January 2024
                    </p>
                </div>
            </div>
        </div>
    );
} 