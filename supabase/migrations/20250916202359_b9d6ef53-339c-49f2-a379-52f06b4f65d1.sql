-- Enable RLS on all user-related tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" 
ON public.users 
FOR SELECT 
USING (id = (current_setting('app.current_user_id', true))::uuid);

-- Create policies for credit_cards
CREATE POLICY "Users can view their own credit cards" 
ON public.credit_cards 
FOR SELECT 
USING (user_id = (current_setting('app.current_user_id', true))::uuid);

CREATE POLICY "Users can insert their own credit cards" 
ON public.credit_cards 
FOR INSERT 
WITH CHECK (user_id = (current_setting('app.current_user_id', true))::uuid);

CREATE POLICY "Users can update their own credit cards" 
ON public.credit_cards 
FOR UPDATE 
USING (user_id = (current_setting('app.current_user_id', true))::uuid);

-- Create policies for transactions
CREATE POLICY "Users can view their own transactions" 
ON public.transactions 
FOR SELECT 
USING (user_id = (current_setting('app.current_user_id', true))::uuid);

CREATE POLICY "Users can insert their own transactions" 
ON public.transactions 
FOR INSERT 
WITH CHECK (user_id = (current_setting('app.current_user_id', true))::uuid);

CREATE POLICY "Users can update their own transactions" 
ON public.transactions 
FOR UPDATE 
USING (user_id = (current_setting('app.current_user_id', true))::uuid);

-- Create policies for reminders
CREATE POLICY "Users can view their own reminders" 
ON public.reminders 
FOR SELECT 
USING (user_id = (current_setting('app.current_user_id', true))::uuid);

CREATE POLICY "Users can insert their own reminders" 
ON public.reminders 
FOR INSERT 
WITH CHECK (user_id = (current_setting('app.current_user_id', true))::uuid);

CREATE POLICY "Users can update their own reminders" 
ON public.reminders 
FOR UPDATE 
USING (user_id = (current_setting('app.current_user_id', true))::uuid);

-- Create policies for subscriptions
CREATE POLICY "Users can view their own subscriptions" 
ON public.subscriptions 
FOR SELECT 
USING (user_id = (current_setting('app.current_user_id', true))::uuid);

CREATE POLICY "Users can insert their own subscriptions" 
ON public.subscriptions 
FOR INSERT 
WITH CHECK (user_id = (current_setting('app.current_user_id', true))::uuid);

CREATE POLICY "Users can update their own subscriptions" 
ON public.subscriptions 
FOR UPDATE 
USING (user_id = (current_setting('app.current_user_id', true))::uuid);