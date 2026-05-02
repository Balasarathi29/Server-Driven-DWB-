import dotenv from "dotenv";

dotenv.config();

const normalizeEnvValue = (value?: string): string => value?.trim() || "";

interface EnvConfig {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  redisUrl: string;
  jwtSecret: string;
  jwtRefreshSecret: string;
  jwtExpiresIn: string;
  jwtRefreshExpiresIn: string;
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
  anthropicApiKey?: string;
  openaiApiKey?: string;
  groqApiKey?: string;
  allowedOrigins: string[];
}

const env: EnvConfig = {
  port: parseInt(process.env.PORT || "5001", 10),
  nodeEnv: normalizeEnvValue(process.env.NODE_ENV) || "development",
  mongoUri: normalizeEnvValue(process.env.MONGODB_URI),
  redisUrl: normalizeEnvValue(process.env.REDIS_URL),
  jwtSecret: normalizeEnvValue(process.env.JWT_SECRET),
  jwtRefreshSecret: normalizeEnvValue(process.env.JWT_REFRESH_SECRET),
  jwtExpiresIn: normalizeEnvValue(process.env.JWT_EXPIRES_IN) || "1h",
  jwtRefreshExpiresIn:
    normalizeEnvValue(process.env.JWT_REFRESH_EXPIRES_IN) || "7d",
  cloudinary: {
    cloudName: normalizeEnvValue(process.env.CLOUDINARY_CLOUD_NAME),
    apiKey: normalizeEnvValue(process.env.CLOUDINARY_API_KEY),
    apiSecret: normalizeEnvValue(process.env.CLOUDINARY_API_SECRET),
  },
  anthropicApiKey:
    normalizeEnvValue(process.env.ANTHROPIC_API_KEY) || undefined,
  openaiApiKey: normalizeEnvValue(process.env.OPENAI_API_KEY) || undefined,
  groqApiKey: normalizeEnvValue(process.env.GROQ_API_KEY) || undefined,
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};

// Validate critical environment variables
const validateEnv = () => {
  const requiredEnvVars = ["mongoUri", "jwtSecret", "jwtRefreshSecret"];
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !env[envVar as keyof EnvConfig],
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`,
    );
  }

  if (!env.anthropicApiKey && !env.openaiApiKey && !env.groqApiKey) {
    console.warn(
      "Warning: No AI API key configured. AI features will be disabled.",
    );
  }
};

validateEnv();

export default env;
