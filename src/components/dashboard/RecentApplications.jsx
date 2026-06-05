import React from "react";

const RecentApplications = () => {
  const applications = [
    { id: 1, name: "Julianne Moore", role: "Senior Product Designer", date: "Oct 24, 2023", experience: "6 years", status: "Interviewing" },
    { id: 2, name: "Robert Downey", role: "Backend Engineer", date: "Oct 23, 2023", experience: "4 years", status: "New" },
    { id: 3, name: "Emma Stone", role: "Marketing Lead", date: "Oct 22, 2023", experience: "8 years", status: "Reviewing" },
    { id: 4, name: "Chris Pratt", role: "Product Manager", date: "Oct 21, 2023", experience: "5 years", status: "Rejected" },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Interviewing": return "bg-[#143224] text-[#4ade80] border border-[#1b432e]";
      case "New": return "bg-[#1f1f22] text-[#e4e4e7] border border-[#2d2d30]";
      case "Reviewing": return "bg-[#332218] text-[#fb923c] border border-[#442c1e]";
      case "Rejected": return "bg-[#2f1919] text-[#f87171] border border-[#402020]";
      default: return "bg-[#1f1f22] text-white";
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3.5 px-0.5">
        <h2 className="text-lg font-semibold text-[#f4f4f5]">Recent Applications</h2>
        <button className="text-xs text-[#a1a1aa] hover:text-white transition-colors font-medium">View all</button>
      </div>
      
      {/* স্ক্রোলবার কন্টেইনার */}
      <div className="overflow-x-auto px-4 py-3 rounded-xl bg-[#121214] border border-[#232326] shadow-sm
        [&::-webkit-scrollbar]:h-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-[#27272a]
        [&::-webkit-scrollbar-thumb]:rounded-full">
        
        <table className="w-full text-left border-collapse table-auto min-w-[600px]">
          <thead>
            {/* হেডার টেক্সট আরও ছোট (text-[11px]) ও অপ্টিমাইজ করা হয়েছে */}
            <tr className="text-[11px] font-semibold text-[#71717a] border-b border-[#232326] bg-[#161619]/40">
              <th className="p-3 pl-4 py-2.5">Candidate Name</th>
              <th className="p-3 py-2.5">Role</th>
              <th className="p-3 py-2.5">Date Applied</th>
              <th className="p-3 py-2.5">Experience</th>
              <th className="p-3 py-2.5 text-center">Status</th>
            </tr>
          </thead>
          {/* বডি টেক্সট sm থেকে কমিয়ে text-xs করা হয়েছে */}
          <tbody className="text-xs text-[#e4e4e7]">
            {applications.map((app) => (
              <tr key={app.id} className="border-b last:border-none border-[#232326]/30 hover:bg-[#171719] transition-colors">
                
                {/* নেম সেল এবং এভাটার সাইজ w-7 থেকে w-6 করা হয়েছে */}
                <td className="p-3 pl-4 py-3 flex items-center gap-2.5 font-medium text-[#f4f4f5] whitespace-nowrap">
                  <div className="w-6 h-6 rounded-full bg-[#1c1c1f] border border-[#27272a] flex-shrink-0" />
                  {app.name}
                </td>
                
                <td className="p-3 py-3 text-[#a1a1aa] whitespace-nowrap">{app.role}</td>
                <td className="p-3 py-3 text-[#71717a] whitespace-nowrap">{app.date}</td>
                <td className="p-3 py-3 text-[#a1a1aa] whitespace-nowrap">{app.experience}</td>
                
                {/* স্ট্যাটাস ব্যাজ টেক্সট এবং প্যাডিং স্লিক করা হয়েছে */}
                <td className="p-3 py-3 text-center whitespace-nowrap">
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border inline-block ${getStatusStyle(app.status)}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 

export default RecentApplications;