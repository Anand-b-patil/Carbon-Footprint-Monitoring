package com.nutrino.carbonfootprint.presentation.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.nutrino.carbonfootprint.data.remote.auth.SignUpRequest
import com.nutrino.carbonfootprint.presentation.state.SignUpUIState
import com.nutrino.carbonfootprint.presentation.viewmodels.AuthViewmodel
import com.nutrino.carbonfootprint.presentation.viewmodels.UserPreferenceViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SignUpScreen(
    authViewmodel: AuthViewmodel = hiltViewModel(),
    userPreferenceViewModel: UserPreferenceViewModel = hiltViewModel(),
    onSignUpSuccess: () -> Unit = {},
    onNavigateToLogin: () -> Unit = {},
    onNavigateToHome: () -> Unit = {}
) {
    // Collect states
    val signUpState by authViewmodel.signUpState.collectAsStateWithLifecycle()
    val isInitialized by userPreferenceViewModel.isInitialized.collectAsStateWithLifecycle()
    val isLoggedIn by userPreferenceViewModel.isLoggedIn.collectAsStateWithLifecycle()

    // Check if user is already logged in after initialization
    LaunchedEffect(isInitialized, isLoggedIn) {
        if (isInitialized && isLoggedIn) {
            onNavigateToHome()
        }
    }

    // Form state variables
    var email by remember { mutableStateOf("") }
    var orgName by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var confirmPassword by remember { mutableStateOf("") }
    var passwordVisible by remember { mutableStateOf(false) }
    var confirmPasswordVisible by remember { mutableStateOf(false) }

    // Form validation states
    var emailError by remember { mutableStateOf("") }
    var orgNameError by remember { mutableStateOf("") }
    var passwordError by remember { mutableStateOf("") }
    var confirmPasswordError by remember { mutableStateOf("") }

    // Handle signup success
    LaunchedEffect(signUpState) {
        when (signUpState) {
            is SignUpUIState.Success -> {
                onSignUpSuccess()
            }
            else -> {}
        }
    }

    // Show loading if not initialized
    if (!isInitialized) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            CircularProgressIndicator()
        }
        return
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // Title
        Text(
            text = "Create Account",
            fontSize = 28.sp,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.padding(bottom = 32.dp)
        )

        // Email Field
        OutlinedTextField(
            value = email,
            onValueChange = {
                email = it
                emailError = ""
            },
            label = { Text("Email") },
            placeholder = { Text("Enter your email") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
            isError = emailError.isNotEmpty(),
            supportingText = if (emailError.isNotEmpty()) {
                { Text(emailError, color = MaterialTheme.colorScheme.error) }
            } else null,
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 4.dp),
            singleLine = true
        )

        // Organization Name Field
        OutlinedTextField(
            value = orgName,
            onValueChange = {
                orgName = it
                orgNameError = ""
            },
            label = { Text("Organization Name") },
            placeholder = { Text("Enter organization name") },
            isError = orgNameError.isNotEmpty(),
            supportingText = if (orgNameError.isNotEmpty()) {
                { Text(orgNameError, color = MaterialTheme.colorScheme.error) }
            } else null,
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 4.dp),
            singleLine = true
        )

        // Password Field
        OutlinedTextField(
            value = password,
            onValueChange = {
                password = it
                passwordError = ""
            },
            label = { Text("Password") },
            placeholder = { Text("Enter your password") },
            visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
            isError = passwordError.isNotEmpty(),
            supportingText = if (passwordError.isNotEmpty()) {
                { Text(passwordError, color = MaterialTheme.colorScheme.error) }
            } else null,
            trailingIcon = {
                IconButton(onClick = { passwordVisible = !passwordVisible }) {
                    Icon(
                        imageVector = if (passwordVisible)
                            Icons.Default.Visibility
                        else
                            androidx.compose.material.icons.Icons.Default.VisibilityOff,
                        contentDescription = if (passwordVisible) "Hide password" else "Show password"
                    )
                }
            },
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 4.dp),
            singleLine = true
        )

        // Confirm Password Field
        OutlinedTextField(
            value = confirmPassword,
            onValueChange = {
                confirmPassword = it
                confirmPasswordError = ""
            },
            label = { Text("Confirm Password") },
            placeholder = { Text("Confirm your password") },
            visualTransformation = if (confirmPasswordVisible) VisualTransformation.None else PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
            isError = confirmPasswordError.isNotEmpty(),
            supportingText = if (confirmPasswordError.isNotEmpty()) {
                { Text(confirmPasswordError, color = MaterialTheme.colorScheme.error) }
            } else null,
            trailingIcon = {
                IconButton(onClick = { confirmPasswordVisible = !confirmPasswordVisible }) {
                    Icon(
                        imageVector = if (confirmPasswordVisible)
                            androidx.compose.material.icons.Icons.Default.Visibility
                        else
                            androidx.compose.material.icons.Icons.Default.VisibilityOff,
                        contentDescription = if (confirmPasswordVisible) "Hide password" else "Show password"
                    )
                }
            },
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 4.dp),
            singleLine = true
        )

        // Error message for signup state
        if (signUpState is SignUpUIState.Error) {
            Text(
                text = (signUpState as SignUpUIState.Error).error,
                color = MaterialTheme.colorScheme.error,
                modifier = Modifier.padding(vertical = 8.dp)
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Sign Up Button
        Button(
            onClick = {
                // Validate form
                var isValid = true

                if (email.isBlank()) {
                    emailError = "Email is required"
                    isValid = false
                } else if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                    emailError = "Please enter a valid email"
                    isValid = false
                }

                if (orgName.isBlank()) {
                    orgNameError = "Organization name is required"
                    isValid = false
                }

                if (password.isBlank()) {
                    passwordError = "Password is required"
                    isValid = false
                } else if (password.length < 6) {
                    passwordError = "Password must be at least 6 characters"
                    isValid = false
                }

                if (confirmPassword.isBlank()) {
                    confirmPasswordError = "Please confirm your password"
                    isValid = false
                } else if (password != confirmPassword) {
                    confirmPasswordError = "Passwords do not match"
                    isValid = false
                }

                if (isValid) {
                    authViewmodel.signUp(
                        SignUpRequest(
                            email = email.trim(),
                            org_name = orgName.trim(),
                            password = password
                        )
                    )
                }
            },
            enabled = signUpState !is SignUpUIState.Loading,
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp)
        ) {
            if (signUpState is SignUpUIState.Loading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(20.dp),
                    color = MaterialTheme.colorScheme.onPrimary
                )
            } else {
                Text(
                    text = "Sign Up",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Medium
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Navigate to Login
        Row(
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Already have an account? ",
                color = MaterialTheme.colorScheme.onSurface
            )
            TextButton(onClick = onNavigateToLogin) {
                Text(
                    text = "Sign In",
                    color = MaterialTheme.colorScheme.primary,
                    fontWeight = FontWeight.Medium
                )
            }
        }
    }
}