"use client";

import { useState, useEffect } from "react";
import type { User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  Plus,
  Leaf,
  ChevronLeft,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChatBot } from "@/components/chat-bot";
import { uploadFiles } from "@/lib/storage";
import { addItem } from "@/lib/firestore";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import UploadButton from "./uploadButton";

const categories = [
  { value: "outerwear", label: "Outerwear", basePoints: 25 },
  { value: "dresses", label: "Dresses", basePoints: 30 },
  { value: "tops", label: "Tops", basePoints: 15 },
  { value: "bottoms", label: "Bottoms", basePoints: 20 },
  { value: "footwear", label: "Footwear", basePoints: 25 },
  { value: "accessories", label: "Accessories", basePoints: 10 },
  { value: "activewear", label: "Activewear", basePoints: 18 },
  { value: "formal", label: "Formal", basePoints: 35 },
];

const conditions = [
  { value: "like-new", label: "Like New", multiplier: 1.2 },
  { value: "excellent", label: "Excellent", multiplier: 1.0 },
  { value: "very-good", label: "Very Good", multiplier: 0.8 },
  { value: "good", label: "Good", multiplier: 0.6 },
  { value: "fair", label: "Fair", multiplier: 0.4 },
];

const sizes = {
  clothing: ["XS", "S", "M", "L", "XL", "XXL"],
  footwear: ["5", "6", "7", "8", "9", "10", "11", "12"],
  accessories: ["One Size"],
};

type UploadImage = { file: File; url: string; id: string };
interface AddItemFormData {
  title: string;
  description: string;
  category: string;
  condition: string;
  size: string;
  tags: string[];
  images: UploadImage[];
}

export default function AddItemPage() {
  const [formData, setFormData] = useState<AddItemFormData>({
    title: "",
    description: "",
    category: "",
    condition: "",
    size: "",
    tags: [],
    images: [],
  });
  const [dragActive, setDragActive] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [estimatedPoints, setEstimatedPoints] = useState(0);
  const [showChatBot, setShowChatBot] = useState(false);

  // Calculate estimated points based on category and condition
  useEffect(() => {
    if (formData.category && formData.condition) {
      const category = categories.find((c) => c.value === formData.category);
      const condition = conditions.find((c) => c.value === formData.condition);
      if (category && condition) {
        const points = Math.round(category.basePoints * condition.multiplier);
        setEstimatedPoints(points);
      }
    } else {
      setEstimatedPoints(0);
    }
  }, [formData.category, formData.condition]);

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const newImages = Array.from(files).slice(0, 5 - formData.images.length);
    setFormData((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        ...newImages.map((file) => ({
          file,
          url: URL.createObjectURL(file),
          id: Math.random().toString(36).substr(2, 9),
        })),
      ],
    }));
  };

  const removeImage = (imageId: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }));
  };

  const addTag = () => {
    if (
      newTag.trim() &&
      !formData.tags.includes(newTag.trim()) &&
      formData.tags.length < 10
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!user) throw new Error("You must be logged in to add an item.");
      if (formData.images.length === 0)
        throw new Error("Please upload at least one image.");
      // Upload images to Firebase Storage
      const imageFiles = formData.images.map((img: UploadImage) => img.file);
      const imageUrls = await uploadFiles(imageFiles, `items/${user.uid}`);
      // Prepare item object
      const item = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        condition: formData.condition,
        size: formData.size,
        tags: formData.tags,
        points: estimatedPoints,
        images: imageUrls,
        ownerId: user.uid,
        status: "pending",
        badges: ["New"],
        location: "",
      };
      await addItem(item);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (typeof err === "object" && err && "message" in err) {
        setError(
          (err as { message?: string }).message || "Failed to add item."
        );
      } else {
        setError("Failed to add item.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getSizeOptions = () => {
    if (formData.category === "footwear") return sizes.footwear;
    if (formData.category === "accessories") return sizes.accessories;
    return sizes.clothing;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-green-800">ReWear</span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowChatBot(true)}
            className="flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Need Help?
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            List Your Item
          </h1>
          <p className="text-gray-600">
            Share your unused clothing with the ReWear community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photos Section */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Photos *</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-green-500 bg-green-50" : "border-gray-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Click to upload images</p>
                <p className="text-sm text-gray-500">
                  PNG, JPG up to 10MB each
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    const input = document.getElementById(
                      "file-upload"
                    ) as HTMLInputElement | null;
                    if (input) input.click();
                  }}
                >
                  Choose Files
                </Button>
              </div>
            </div>

            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div key={image.id} className="relative group">
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {index === 0 && (
                      <Badge className="absolute top-2 left-2 bg-green-600">
                        Main
                      </Badge>
                    )}
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(image.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Item Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium">
              Item Title *
            </Label>
            <Input
              id="title"
              placeholder="e.g., Vintage Denim Jacket"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>

          {/* Category and Condition Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Condition *</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, condition: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition.value} value={condition.value}>
                      {condition.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Size and Estimated Points Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">Size</Label>
              <Select
                value={formData.size}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, size: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {getSizeOptions().map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Estimated Points</Label>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                <span className="text-2xl font-bold text-green-600 mr-2">
                  {estimatedPoints}
                </span>
                <span className="text-green-700">points</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the item's style, fit, any flaws, and why you're swapping it..."
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add tags (e.g., vintage, summer, casual)"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
              />
              <Button
                type="button"
                onClick={addTag}
                disabled={!newTag.trim() || formData.tags.length >= 10}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}

          <div style={{ padding: "40px", width: "400px"}}>
            <UploadButton />
          </div>

          {error && (
            <div className="text-red-600 text-center mt-4">{error}</div>
          )}

          <p className="text-center text-sm text-gray-600">
            Your item will be reviewed by our team before going live
          </p>
        </form>
      </div>

      {/* ChatBot */}
      {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}
    </div>
  );
}
