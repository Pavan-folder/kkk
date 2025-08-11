import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  userType: text("user_type").notNull(), // 'buyer' | 'seller'
  phone: text("phone"),
  location: text("location"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const businesses = pgTable("businesses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  industry: text("industry").notNull(),
  description: text("description"),
  location: text("location"),
  foundedYear: integer("founded_year"),
  employeeCount: integer("employee_count"),
  annualRevenue: decimal("annual_revenue", { precision: 12, scale: 2 }),
  askingPrice: decimal("asking_price", { precision: 12, scale: 2 }),
  profitMargin: decimal("profit_margin", { precision: 5, scale: 2 }),
  growthRate: decimal("growth_rate", { precision: 5, scale: 2 }),
  businessModel: text("business_model"),
  isVerified: boolean("is_verified").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const buyerProfiles = pgTable("buyer_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  buyerId: varchar("buyer_id").references(() => users.id).notNull(),
  budgetMin: decimal("budget_min", { precision: 12, scale: 2 }),
  budgetMax: decimal("budget_max", { precision: 12, scale: 2 }),
  preferredIndustries: jsonb("preferred_industries").$type<string[]>(),
  experienceLevel: text("experience_level"), // 'first-time' | 'experienced' | 'serial'
  timeline: text("timeline"), // '3-6months' | '6-12months' | '1year+' | 'flexible'
  investmentGoals: text("investment_goals"),
  preferredCompanySize: text("preferred_company_size"),
  geographicPreference: text("geographic_preference"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const matches = pgTable("matches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  buyerId: varchar("buyer_id").references(() => users.id).notNull(),
  businessId: varchar("business_id").references(() => businesses.id).notNull(),
  status: text("status").default('pending'), // 'pending' | 'accepted' | 'rejected' | 'in_process' | 'completed'
  matchScore: decimal("match_score", { precision: 5, scale: 2 }),
  initiatedBy: text("initiated_by"), // 'buyer' | 'seller'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const deals = pgTable("deals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  matchId: varchar("match_id").references(() => matches.id).notNull(),
  currentStage: text("current_stage").default('initial_contact'), // 'initial_contact' | 'due_diligence' | 'negotiation' | 'closing' | 'completed'
  progress: integer("progress").default(0), // 0-100
  currentOffer: decimal("current_offer", { precision: 12, scale: 2 }),
  documents: jsonb("documents").$type<string[]>(),
  nextSteps: jsonb("next_steps").$type<any[]>(),
  aiInsights: jsonb("ai_insights").$type<any>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  dealId: varchar("deal_id").references(() => deals.id),
  senderId: varchar("sender_id").references(() => users.id).notNull(),
  receiverId: varchar("receiver_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  messageType: text("message_type").default('text'), // 'text' | 'document' | 'system'
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBusinessSchema = createInsertSchema(businesses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBuyerProfileSchema = createInsertSchema(buyerProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMatchSchema = createInsertSchema(matches).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDealSchema = createInsertSchema(deals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Business = typeof businesses.$inferSelect;
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;

export type BuyerProfile = typeof buyerProfiles.$inferSelect;
export type InsertBuyerProfile = z.infer<typeof insertBuyerProfileSchema>;

export type Match = typeof matches.$inferSelect;
export type InsertMatch = z.infer<typeof insertMatchSchema>;

export type Deal = typeof deals.$inferSelect;
export type InsertDeal = z.infer<typeof insertDealSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
