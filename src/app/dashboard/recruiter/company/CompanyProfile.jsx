"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Layers, 
  Globe, 
  MapPin, 
  Users, 
  FileText, 
  Edit3, 
  X, 
  Upload, 
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { CreateCompany } from "@/lib/action/companies/company";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  // নতুন ইউজারের ক্ষেত্রে recruiterCompany যদি খালি {} বা null আসে, তবে এটি null সেট করবে
  const [currentCompany, setCurrentCompany] = useState(
    recruiterCompany && recruiterCompany.name ? recruiterCompany : null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); 
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({});

  const getStatusStyle = (status) => {
    if (status === "Approved") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (status === "Rejected") return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    const companyName = formData.get("companyName");
    const location = formData.get("location");

    if (!companyName || !location) {
      setErrors({ 
        companyName: !companyName ? "Company name is required" : "",
        location: !location ? "Location is required" : "" ,
      });
      setPending(false);
      return;
    }

    let finalLogoUrl = currentCompany?.logoUrl || "https://placehold.co/150";

    if (selectedFile) {
      const imgFormData = new FormData();
      imgFormData.append("image", selectedFile);

      try {
        const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
        
        if (!apiKey || apiKey === "YOUR_IMGBB_API_KEY_HERE") {
          console.warn("Warning: ImgBB API Key is missing or invalid. Using default placeholder image.");
        } else {
          const imgResponse = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: "POST",
            body: imgFormData,
          });
          const imgData = await imgResponse.json();
          
          if (imgData.success) {
            finalLogoUrl = imgData.data.url; 
          } else {
            console.error("ImgBB upload failed:", imgData.error?.message);
          }
        }
      } catch (error) {
        console.error("ImgBB upload error:", error);
      }
    }

    const companyData = {
      name: companyName,
      industry: formData.get("industry"),
      website: formData.get("websiteUrl") ? `https://${formData.get("websiteUrl")}` : "",
      location: location,
      employeeCount: formData.get("employeeCount"),
      description: formData.get("description"),
      logoUrl: finalLogoUrl, 
      status: currentCompany?.status || "Pending" ,
      recruiterId: recruiter?.id,
    };

    try {
      const dbData = await CreateCompany(companyData);

      if (dbData && !dbData.error) {
        setCurrentCompany({ ...companyData, _id: dbData.insertedId }); 
        setIsEditing(false);
        setSelectedFile(null); 
        alert("Company Registered Successfully!");
      } else {
        console.error("Failed to save profile:", dbData?.error);
        alert(dbData?.error || "Failed to save profile in database.");
      }
    } catch (err) {
      console.error("API Connection Error:", err);
      alert("Could not connect to the server.");
    } finally {
      setPending(false);
    }
  };   

  return (
    <div className="w-full max-w-xl mx-auto p-4 select-none">
      
      {/* ১. নো কোম্পানি রেজিস্টার্ড ভিউ (নতুন ইউজাররা প্রথমে এটি দেখবে) */}
      {!currentCompany && !isEditing && (
        <div className="border border-dashed border-zinc-800 rounded-xl p-8 text-center bg-zinc-950/40 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-zinc-900 rounded-full text-zinc-500 border border-zinc-800 shadow-md">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-zinc-200">No Company Registered Yet</h3>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto">
              Please register your company dashboard first to manage job posts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="h-10 px-5 text-xs font-semibold bg-white hover:bg-zinc-200 text-black rounded-lg transition dynamic-shadow"
          >
            Register Company
          </button>
        </div>
      )}

      {/* ২. কোম্পানি প্রোফাইল ভিউ (রেজিস্ট্রেশন কমপ্লিট হওয়ার পর দেখাবে) */}
      {currentCompany && !isEditing && (
        <div className="border border-zinc-800 rounded-xl bg-zinc-900/40 backdrop-blur-md p-6 space-y-5 animate-fade-in">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800/60">
            <div className="flex items-center gap-3.5">
              {currentCompany.logoUrl && (
                <Image
                  src={currentCompany.logoUrl} 
                  height={56} 
                  width={56}
                  alt="logo" 
                  className="w-14 h-14 rounded-xl object-cover bg-zinc-900 border border-zinc-800 p-1" 
                  unoptimized 
                />
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-zinc-100 tracking-tight">{currentCompany.name}</h2>
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${getStatusStyle(currentCompany.status)}`}>
                    {currentCompany.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 inline-flex items-center gap-1 mt-0.5">
                  <Globe className="w-3 h-3 text-zinc-500" /> {currentCompany.website || "No website"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setLogoPreview(currentCompany.logoUrl);
                setIsEditing(true);
              }}
              className="inline-flex items-center gap-1 px-3 h-8 text-xs font-medium text-zinc-300 hover:text-white border border-zinc-800 bg-zinc-900/40 rounded-lg transition"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-zinc-900/20 border border-zinc-800/60 flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-zinc-500" />
              <div>
                <p className="text-[10px] text-zinc-500 font-medium uppercase">Industry</p>
                <p className="text-xs text-zinc-300 mt-0.5">{currentCompany.industry}</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/20 border border-zinc-800/60 flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-zinc-500" />
              <div>
                <p className="text-[10px] text-zinc-500 font-medium uppercase">Location</p>
                <p className="text-xs text-zinc-300 mt-0.5">{currentCompany.location}</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/20 border border-zinc-800/60 flex items-center gap-2.5 col-span-2">
              <Users className="w-4 h-4 text-zinc-500" />
              <div>
                <p className="text-[10px] text-zinc-500 font-medium uppercase">Employee Range</p>
                <p className="text-xs text-zinc-300 mt-0.5">{currentCompany.employeeCount}</p>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[11px] font-medium text-zinc-400 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-zinc-500" /> Description
            </p>
            <p className="text-xs text-zinc-300 bg-zinc-900/10 border border-zinc-800/40 p-3 rounded-lg leading-relaxed">
              {currentCompany.description}
            </p>
          </div>
        </div>
      )}

      {/* ৩. রেজিস্ট্রেশন এবং এডিট ফর্ম ভিউ */}
      {isEditing && (
        <div className="border border-zinc-800 bg-zinc-950 rounded-xl shadow-2xl overflow-hidden text-zinc-100 p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-zinc-100">
                {currentCompany ? "Edit Workspace Platform" : "Configure Workspace Platform"}
              </h3>
            </div>
            {currentCompany && (
              <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="p-1 rounded-md text-zinc-500 hover:text-zinc-300 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <form onSubmit={handleCompanySubmit} noValidate className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Company Name</label>
                <input
                  name="companyName"
                  type="text"
                  defaultValue={currentCompany?.name || ""}
                  placeholder="e.g. Acme Corp"
                  className={`w-full h-10 px-3 text-sm rounded-lg bg-zinc-900/60 border ${errors.companyName ? 'border-red-500/80 bg-red-950/10' : 'border-zinc-800'} text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition`}
                />
                {errors.companyName && <p className="text-[11px] text-red-400">{errors.companyName}</p>}
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Industry / Category</label>
                <select
                  name="industry"
                  defaultValue={currentCompany?.industry || "Technology"}
                  className="w-full h-10 px-3 text-sm rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-700 transition"
                >
                  <option value="Technology">Technology</option>
                  <option value="Design & Creative">Design & Creative</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Travel & Hospitality">Travel & Hospitality</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Music & Streaming">Music & Streaming</option>
                  <option value="Transport">Transport</option>                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Website URL</label>
                <div className="relative flex items-center w-full">
                  <span className="absolute left-3 text-xs text-zinc-600">https://</span>
                  <input
                    name="websiteUrl"
                    type="text"
                    defaultValue={currentCompany?.website?.replace("https://", "") || ""}
                    placeholder="www.company.com"
                    className="w-full h-10 pl-16 pr-3 text-sm rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Location</label>
                <div className="relative flex items-center w-full">
                  <MapPin className="absolute left-3 w-4 h-4 text-zinc-600" />
                  <input
                    name="location"
                    type="text"
                    defaultValue={currentCompany?.location || ""}
                    placeholder="City, Country"
                    className={`w-full h-10 pl-9 pr-3 text-sm rounded-lg bg-zinc-900/60 border ${errors.location ? 'border-red-500/80 bg-red-950/10' : 'border-zinc-800'} text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition`}
                  />
                </div>
                {errors.location && <p className="text-[11px] text-red-400">{errors.location}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Employee Count Range</label>
                <select
                  name="employeeCount"
                  defaultValue={currentCompany?.employeeCount || "1-10 employees"}
                  className="w-full h-10 px-3 text-sm rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-700 transition"
                >
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="51-200 employees">51-200 employees</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <span className="text-xs font-medium text-zinc-300">Company Logo</span>
                <div className="flex items-center gap-3">
                  <label className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-zinc-900 border border-dashed border-zinc-800 cursor-pointer hover:border-zinc-700 transition shrink-0 relative overflow-hidden group">
                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                    {logoPreview ? (
                      <Image src={logoPreview} width={44} height={44} alt="Preview" className="w-full h-full object-cover" unoptimized />
                    ) : (
                      <Upload className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400" />
                    )}
                  </label>
                  <div>
                    <p className="text-xs font-medium text-zinc-300">Upload image</p>
                    <p className="text-[10px] text-zinc-600">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Brief Description</label>
              <textarea
                name="description"
                rows={4}
                defaultValue={currentCompany?.description || ""}
                placeholder="Tell us about your company's mission and culture..."
                className="w-full p-3 text-sm rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition resize-none"
              />
            </div>

            <div className="pt-3 border-t border-zinc-900 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  if (currentCompany) setIsEditing(false);
                }}
                disabled={!currentCompany}
                className="px-4 h-10 text-xs font-medium text-zinc-400 hover:text-zinc-200 border border-zinc-800 bg-zinc-900/20 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={pending}
                className="px-5 h-10 text-xs font-semibold bg-white hover:bg-zinc-200 text-black rounded-lg transition shadow-md flex items-center gap-1.5 min-w-[110px] justify-center"
              >
                {pending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                  </>
                ) : currentCompany ? (
                  "Update Info"
                ) : (
                  "Complete Setup"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  ); 
}