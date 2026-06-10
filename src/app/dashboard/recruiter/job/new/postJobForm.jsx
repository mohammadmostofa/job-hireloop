"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Form, Fieldset, TextField, Button, Select, Label, ListBox } from "@heroui/react";
import { Briefcase, Layers, Clock, CircleDollarSign, Globe, MapPin, Calendar, Lightbulb, ListTodo, Heart, Send, X } from "lucide-react";
import { createJob } from "@/lib/action/jobs";
import { useRouter } from "next/navigation";

export default function PostJobForm({ company }) {
  const router = useRouter();
  const [isRemote, setIsRemote] = useState(false);
  const [locationText, setLocationText] = useState(""); 
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isRemote) {
      setLocationText("Remote");
    } else {
      setLocationText("");
    }
  }, [isRemote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    const remoteBoolean = isRemote; 

    const newErrors = {};
    const jobTitle = formData.get("jobTitle");
    const deadline = formData.get("deadline");
    const responsibilities = formData.get("responsibilities");
    const requirements = formData.get("requirements");
    const locationVal = locationText; 

    if (!jobTitle) newErrors.jobTitle = "Job title is required.";
    if (!deadline) newErrors.deadline = "Application deadline is required.";
    if (!responsibilities) newErrors.responsibilities = "Core responsibilities are required.";
    if (!requirements) newErrors.requirements = "Candidate requirements are required.";
    
    if (!remoteBoolean && !locationVal.trim()) {
      newErrors.location = "Location is required for non-remote roles.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    setPending(true);
    const targetCompany = Array.isArray(company) ? company[0] : company;

    const jobPayload = {
      title: jobTitle,
      category: formData.get("jobCategory"),
      type: formData.get("jobType"),
      salary: {
        min: Number(formData.get("salaryMin")) || 0,
        max: Number(formData.get("salaryMax")) || 0,
        currency: formData.get("currency"),
      },
      locationType: remoteBoolean ? "Remote" : "On-site",
      location: remoteBoolean ? "Remote" : locationVal, 
      deadline: deadline,
      description: {
        responsibilities: responsibilities,
        requirements: requirements,
        benefits: formData.get("benefits") || "",
      },
      companyId: targetCompany?._id || targetCompany?.id || null,
      companyName: targetCompany?.name || "Unknown Company",
      companyLogo: targetCompany?.logoUrl || "",
      status: "active",
      isPubliclyVisible: true,
    };

    try {
      const res = await createJob(jobPayload);
      
      if (res && res.insertedId) {
        toast.success('Job posted successfully!');
        e.target.reset();
        setIsRemote(false);
        setLocationText("");
        router.refresh(); 
        router.push('/dashboard/recruiter');
      } else {
        toast.error('Failed to post job. Please try again.');
        setPending(false);
      }
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error('Something went wrong.');
      setPending(false);
    }
  };

  const targetCompany = Array.isArray(company) ? company[0] : company;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-zinc-950/90 border border-zinc-800/80 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
        
        {/* হেডার */}
        <div className="p-6 pb-4 border-b border-zinc-800/60 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Post a New Job</h1>
            <p className="text-xs text-zinc-400 mt-1">Fill out the details below to publish your open position.</p>
            
            <div className="flex items-center gap-2 mt-4 text-xs text-zinc-400">
              <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
              <span>Posting as: <span className="text-zinc-200 font-medium">{targetCompany?.name || "Unknown Company"}</span></span>
              {targetCompany?.isApproved && (
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-800/30">
                  Approved
                </span>
              )}
            </div>
          </div>
          <button type="button" aria-label="Close form" className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <Form onSubmit={handleSubmit} noValidate className="space-y-6 p-6">
          <input type="hidden" name="isRemote" value={isRemote ? "true" : "false"} />

          {/* SECTION 1: Job Information */}
          <Fieldset className="space-y-5">
            <legend className="text-lg font-medium text-zinc-200 tracking-tight mb-2">
              Job Information
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextField className="w-full flex flex-col">
                <Label htmlFor="jobTitle" className="text-xs font-medium text-zinc-300 mb-1.5 block">Job Title</Label>
                <input 
                  id="jobTitle"
                  name="jobTitle" 
                  aria-required="true"
                  aria-invalid={errors.jobTitle ? "true" : "false"}
                  aria-describedby={errors.jobTitle ? "jobTitle-error" : undefined}
                  className={`w-full h-10 px-3 text-sm rounded-lg bg-zinc-900/60 border ${errors.jobTitle ? 'border-red-500/80 bg-red-950/10' : 'border-zinc-800'} text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition`} 
                  placeholder="e.g. Senior React Developer" 
                />
                {errors.jobTitle && <p id="jobTitle-error" role="alert" className="text-[11px] text-red-400 mt-1">{errors.jobTitle}</p>}
              </TextField>

              <div className="flex flex-col gap-1">
                <Select name="jobCategory" isRequired defaultSelectedKeys={["design"]} className="w-full">
                  <Label className="text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" /> Job Category
                  </Label>
                  <Select.Trigger className="w-full h-10 px-3 rounded-lg border border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-left text-sm text-zinc-300 hover:border-zinc-700 transition">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl p-1 text-zinc-200">
                    <ListBox>
                      <ListBox.Item id="development" textValue="Software Development">Software Development</ListBox.Item>
                      <ListBox.Item id="design" textValue="Design">Design</ListBox.Item>
                      <ListBox.Item id="marketing" textValue="Marketing">Marketing</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <Select name="jobType" isRequired defaultSelectedKeys={["part-time"]} className="w-full">
                  <Label className="text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" /> Job Type
                  </Label>
                  <Select.Trigger className="w-full h-10 px-3 rounded-lg border border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-left text-sm text-zinc-300 hover:border-zinc-700 transition">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl p-1 text-zinc-200">
                    <ListBox>
                      <ListBox.Item id="full-time" textValue="Full-time">Full-time</ListBox.Item>
                      <ListBox.Item id="part-time" textValue="Part-time">Part-time</ListBox.Item>
                      <ListBox.Item id="contract" textValue="Contract">Contract</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField className="w-full flex flex-col">
                <Label htmlFor="deadline" className="text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" /> Application Deadline
                </Label>
                <input 
                  id="deadline"
                  name="deadline" 
                  type="date" 
                  aria-required="true"
                  aria-invalid={errors.deadline ? "true" : "false"}
                  aria-describedby={errors.deadline ? "deadline-error" : undefined}
                  className={`w-full h-10 px-3 text-sm rounded-lg bg-zinc-900/60 border ${errors.deadline ? 'border-red-500/80 bg-red-950/10' : 'border-zinc-800'} text-zinc-100 focus:outline-none focus:border-zinc-700 transition [color-scheme:dark]`} 
                />
                {errors.deadline && <p id="deadline-error" role="alert" className="text-[11px] text-red-400 mt-1">{errors.deadline}</p>}
              </TextField>
            </div>

            {/* স্যালারি কনফিগারেশন */}
            <div className="bg-zinc-900/40 p-4 rounded-lg border border-zinc-800 space-y-4">
              <span className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                <CircleDollarSign className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" /> Salary Range
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <TextField className="w-full">
                  <Label className="text-[11px] font-medium text-zinc-400 mb-1 block">Minimum</Label>
                  <input name="salaryMin" type="number" defaultValue={0} aria-label="Minimum Salary" className="w-full h-9 px-3 text-xs rounded-md bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none" />
                </TextField>
                <TextField className="w-full">
                  <Label className="text-[11px] font-medium text-zinc-400 mb-1 block">Maximum</Label>
                  <input name="salaryMax" type="number" defaultValue={0} aria-label="Maximum Salary" className="w-full h-9 px-3 text-xs rounded-md bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none" />
                </TextField>
                <div className="flex flex-col gap-1">
                  <Select name="currency" isRequired defaultSelectedKeys={["USD"]} className="w-full">
                    <Label className="text-[11px] font-medium text-zinc-400 mb-1 block">Currency</Label>
                    <Select.Trigger className="w-full h-9 px-3 rounded-md border border-zinc-800 bg-zinc-900 flex items-center justify-between text-left text-xs text-zinc-300">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl p-1 text-xs text-zinc-200">
                      <ListBox>
                        <ListBox.Item id="USD" textValue="USD ($)">USD ($)</ListBox.Item>
                        <ListBox.Item id="BDT" textValue="BDT (৳)">BDT (৳)</ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </div>
            </div>

            {/* লোকেশন এবং রিমোট সুইচ */}
            <div className="space-y-3 p-4 bg-zinc-900/30 rounded-lg border border-zinc-800/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" /> Location Setting
                </span>
                <div className="flex items-center gap-2">
                  <span id="remote-label" className="text-[11px] text-zinc-400">Remote</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isRemote}
                    aria-labelledby="remote-label"
                    onClick={() => setIsRemote(!isRemote)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                      isRemote ? "bg-white" : "bg-zinc-800"
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full transition-transform duration-200 ${
                      isRemote ? "translate-x-4.5 bg-black" : "translate-x-1 bg-zinc-400"
                    }`} />
                  </button>
                </div>
              </div>

              <TextField className="w-full flex flex-col pt-1">
                <div className="relative flex items-center w-full">
                  <span className="absolute left-3 text-zinc-500" aria-hidden="true">
                    <Globe className="w-4 h-4" />
                  </span>
                  <input 
                    name="location" 
                    id="location"
                    type="text"
                    aria-required={!isRemote}
                    aria-label="Job Location"
                    aria-invalid={errors.location ? "true" : "false"}
                    aria-describedby={errors.location ? "location-error" : undefined}
                    value={locationText} 
                    onChange={(e) => setLocationText(e.target.value)} 
                    disabled={isRemote}
                    className={`w-full h-10 pl-9 pr-3 text-sm rounded-lg bg-zinc-900/60 border ${
                      errors.location && !isRemote ? 'border-red-500/80 bg-red-950/10' : 'border-zinc-800'
                    } text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition disabled:opacity-70 disabled:text-zinc-400 disabled:cursor-not-allowed`} 
                    placeholder="Austin, TX" 
                  />
                </div>
                {errors.location && !isRemote && (
                  <p id="location-error" role="alert" className="text-[11px] text-red-400 mt-1">
                    {errors.location}
                  </p>
                )}
              </TextField>
            </div>
          </Fieldset>

          {/* SECTION 2: Job Details & Descriptions */}
          <Fieldset className="space-y-5 pt-2">
            <legend className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2 mb-2">
              <ListTodo className="w-3.5 h-3.5" aria-hidden="true" /> Job Details
            </legend>

            <TextField className="w-full flex flex-col">
              <Label htmlFor="responsibilities" className="text-xs font-medium text-zinc-300 mb-1.5 block">Core Responsibilities</Label>
              <textarea 
                id="responsibilities"
                name="responsibilities" 
                rows={4} 
                aria-required="true"
                aria-invalid={errors.responsibilities ? "true" : "false"}
                aria-describedby={errors.responsibilities ? "responsibilities-error" : undefined}
                className={`w-full p-3 text-sm rounded-lg bg-zinc-900/60 border ${errors.responsibilities ? 'border-red-500/80 bg-red-950/10' : 'border-zinc-800'} text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition resize-none`} 
                placeholder="List the primary tasks and responsibilities..." 
              />
              {errors.responsibilities && <p id="responsibilities-error" role="alert" className="text-[11px] text-red-400 mt-1">{errors.responsibilities}</p>}
            </TextField>

            <TextField className="w-full flex flex-col">
              <Label htmlFor="requirements" className="text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" /> Candidate Requirements
              </Label>
              <textarea 
                id="requirements"
                name="requirements" 
                rows={4} 
                aria-required="true"
                aria-invalid={errors.requirements ? "true" : "false"}
                aria-describedby={errors.requirements ? "requirements-error" : undefined}
                className={`w-full p-3 text-sm rounded-lg bg-zinc-900/60 border ${errors.requirements ? 'border-red-500/80 bg-red-950/10' : 'border-zinc-800'} text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition resize-none`} 
                placeholder="Experience, skills, or certifications needed..." 
              />
              {errors.requirements && <p id="requirements-error" role="alert" className="text-[11px] text-red-400 mt-1">{errors.requirements}</p>}
            </TextField>

            <TextField className="w-full">
              <Label htmlFor="benefits" className="text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" /> Benefits & Perks (Optional)
              </Label>
              <textarea id="benefits" name="benefits" rows={3} className="w-full p-3 text-sm rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition resize-none" placeholder="Health insurance, equity, remote work allowances..." />
            </TextField>
          </Fieldset>

          {/* ফুটার একশন */}
          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-end gap-3">
            <Button type="button" className="px-5 h-10 text-xs font-medium text-zinc-400 hover:text-zinc-200 border border-zinc-800 bg-zinc-900/20 rounded-lg transition">Cancel</Button>
            
            <Button 
              type="submit"  
              disabled={pending}
              className="px-5 h-10 text-xs font-semibold bg-white hover:bg-zinc-200 text-black rounded-lg transition-all shadow-md flex items-center gap-1.5 disabled:bg-zinc-800 disabled:text-zinc-500"
            >
              <Send className="w-3.5 h-3.5" aria-hidden="true" />
              {pending ? "Publishing..." : "Publish Job"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}