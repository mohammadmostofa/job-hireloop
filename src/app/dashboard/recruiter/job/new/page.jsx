"use client";

import React, { useState } from "react";
import { 
  Form, 
  Fieldset, 
  TextField, 
  Button, 
  Select, 
  Label, 
  ListBox, 
  FieldError 
} from "@heroui/react";
import { 
  Briefcase, 
  Layers, 
  Clock, 
  CircleDollarSign, 
  Globe, 
  MapPin, 
  Calendar, 
  Lightbulb, 
  ListTodo, 
  Heart, 
  Send,
  X 
} from "lucide-react";

export default function NewJobPost() {
  const currentCompany = {
    id: "comp_98745",
    name: "TechWave Solutions Ltd.",
    isApproved: true,
  };

  const [isRemote, setIsRemote] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    
    const jobPayload = {
      title: formData.get("jobTitle"),
      category: formData.get("jobCategory"),
      type: formData.get("jobType"),
      salary: {
        min: Number(formData.get("salaryMin")),
        max: Number(formData.get("salaryMax")),
        currency: formData.get("currency"),
      },
      locationType: isRemote ? "Remote" : "On-site",
      location: isRemote ? "N/A" : `${formData.get("city")}, ${formData.get("country")}`,
      deadline: formData.get("deadline"),
      description: {
        responsibilities: formData.get("responsibilities"),
        requirements: formData.get("requirements"),
        benefits: formData.get("benefits") || "",
      },
      companyId: currentCompany.id,
      companyName: currentCompany.name,
      status: "active",
      isPubliclyVisible: true,
    };

    console.log("Submitting Job Payload:", jobPayload);

    setTimeout(() => {
      alert("Job posted successfully!");
      setPending(false);
    }, 1000);
  };

  return (
    // ডেমো ইমেজের মতো মেইন ডার্ক ব্যাকগ্রাউন্ড রেপ্যার
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      
      {/* ইমেজের স্টাইল ফলো করে তৈরি করা জব কার্ড */}
      <div className="w-full max-w-3xl bg-zinc-950/90 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
        
        {/* মোডাল বা কার্ড হেডার স্টাইল */}
        <div className="p-6 border-b border-zinc-800/80 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Post a New Job</h1>
            <p className="text-xs text-zinc-400 mt-1">Fill out the details below to publish an active job listing.</p>
          </div>
          <button type="button" className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <Form onSubmit={handleSubmit} className="space-y-6 p-6">
          
          {/* SECTION 1: Job Information */}
          <Fieldset className="space-y-5">
            <legend className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2 mb-2">
              <Briefcase className="w-3.5 h-3.5" /> Job Information
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextField name="jobTitle" isRequired type="text" className="w-full">
                <Label className="text-xs font-medium text-zinc-300 mb-1.5 block">Job Title</Label>
                <input className="w-full h-10 px-3 text-sm rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition" placeholder="e.g. Senior React Developer" />
                <FieldError className="text-xs text-red-400 mt-1" />
              </TextField>

              <div className="flex flex-col gap-1">
                <Select name="jobCategory" isRequired placeholder="Select Category" className="w-full">
                  <Label className="text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-zinc-500" /> Category
                  </Label>
                  <Select.Trigger className="w-full h-10 px-3 rounded-lg border border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-left text-sm text-zinc-300 hover:border-zinc-700 transition">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl p-1 text-zinc-200">
                    <ListBox>
                      <ListBox.Item id="development" textValue="Software Development">Software Development</ListBox.Item>
                      <ListBox.Item id="design" textValue="UI/UX Design">UI/UX Design</ListBox.Item>
                      <ListBox.Item id="marketing" textValue="Marketing">Marketing</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <Select name="jobType" isRequired placeholder="Select Job Type" className="w-full">
                  <Label className="text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" /> Job Type
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

              <TextField name="deadline" isRequired type="date" className="w-full">
                <Label className="text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" /> Application Deadline
                </Label>
                <input type="date" className="w-full h-10 px-3 text-sm rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-zinc-700 transition [color-scheme:dark]" />
                <FieldError className="text-xs text-red-400 mt-1" />
              </TextField>
            </div>

            {/* স্যালারি স্টাইলিং - ইমেজের ডার্ক বক্স প্যাটার্ন মেনে */}
            <div className="bg-zinc-900/40 p-4 rounded-lg border border-zinc-800 space-y-4">
              <span className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                <CircleDollarSign className="w-3.5 h-3.5 text-zinc-500" /> Salary Configuration
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <TextField name="salaryMin" isRequired type="number" className="w-full">
                  <Label className="text-[11px] font-medium text-zinc-400 mb-1 block">Minimum</Label>
                  <input type="number" className="w-full h-9 px-3 text-xs rounded-md bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none" placeholder="Min" />
                </TextField>
                <TextField name="salaryMax" isRequired type="number" className="w-full">
                  <Label className="text-[11px] font-medium text-zinc-400 mb-1 block">Maximum</Label>
                  <input type="number" className="w-full h-9 px-3 text-xs rounded-md bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none" placeholder="Max" />
                </TextField>
                <div className="flex flex-col gap-1">
                  <Select name="currency" isRequired placeholder="USD" className="w-full">
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

            {/* ওয়ার্ক মডেল ও লোকেশন */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-900/40 rounded-lg border border-zinc-800">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-zinc-500" /> Remote Position
                  </span>
                  <span className="text-[10px] text-zinc-500 mt-0.5">This job can be done from anywhere</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRemote(!isRemote)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                    isRemote ? "bg-zinc-100" : "bg-zinc-800"
                  }`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full transition-transform duration-200 ${
                    isRemote ? "translate-x-5 bg-black" : "translate-x-1 bg-zinc-400"
                  }`} />
                </button>
              </div>

              {!isRemote && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField name="city" isRequired={!isRemote} type="text" className="w-full">
                    <Label className="text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" /> City
                    </Label>
                    <input className="w-full h-10 px-3 text-sm rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none" placeholder="e.g. San Francisco" />
                  </TextField>
                  <TextField name="country" isRequired={!isRemote} type="text" className="w-full">
                    <Label className="text-xs font-medium text-zinc-300 mb-1.5 block">Country</Label>
                    <input className="w-full h-10 px-3 text-sm rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none" placeholder="e.g. USA" />
                  </TextField>
                </div>
              )}
            </div>
          </Fieldset>

          {/* SECTION 2: Job Details & Descriptions */}
          <Fieldset className="space-y-5 pt-2">
            <legend className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2 mb-2">
              <ListTodo className="w-3.5 h-3.5" /> Job Details
            </legend>

            <TextField name="responsibilities" isRequired multiLine className="w-full">
              <Label className="text-xs font-medium text-zinc-300 mb-1.5 block">Core Responsibilities</Label>
              <textarea rows={4} className="w-full p-3 text-sm rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition resize-none" placeholder="List the primary tasks and responsibilities..." />
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            <TextField name="requirements" isRequired multiLine className="w-full">
              <Label className="text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-zinc-500" /> Candidate Requirements
              </Label>
              <textarea rows={4} className="w-full p-3 text-sm rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition resize-none" placeholder="Experience, skills, or certifications needed..." />
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            <TextField name="benefits" multiLine className="w-full">
              <Label className="text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-zinc-500" /> Benefits & Perks (Optional)
              </Label>
              <textarea rows={3} className="w-full p-3 text-sm rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition resize-none" placeholder="Health insurance, equity, remote work allowances..." />
            </TextField>
          </Fieldset>

          {/* ইমেজের মতন ক্লিন ফুটার একশন এরিয়া */}
          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
            <span className="text-[11px] text-zinc-500 font-medium">
              Posting as: <span className="text-zinc-300 font-semibold">{currentCompany.name}</span>
            </span>
            
            <div className="flex items-center gap-3">
              <Button
                type="button"
                className="px-5 h-10 text-xs font-medium text-zinc-400 hover:text-zinc-200 border border-zinc-800 bg-zinc-900/20 rounded-lg transition"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isDisabled={pending || !currentCompany.isApproved}
                className="px-5 h-10 text-xs font-semibold bg-white hover:bg-zinc-200 text-black rounded-lg transition-all shadow-md flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                {pending ? "Publishing..." : "Publish Job"}
              </Button>
            </div>
          </div>

        </Form>
      </div>
    </div>
  );
}