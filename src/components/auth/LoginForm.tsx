import { useState, type FormEvent } from "react";
import { useAuth } from "@/hooks/context/useAuth";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const { login, isLoading, isRedirecting } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await login(username.trim());
    if (success) {
      setUsername("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <Label htmlFor='username'>Username</Label>
        <Input id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter username' required />
      </div>
      <Button type='submit' disabled={isLoading} loading={isLoading} loadingText='Logging in...'>
        {isRedirecting ? "Please wait..." : "Login"}
      </Button>
    </form>
  );
}
