# We only need the runtime, not the SDK!
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
EXPOSE 8080

# Copy the finished files from our local 'publish' folder into the container
COPY ./publish .

# Run the app
ENTRYPOINT ["dotnet", "EmsInApi.dll"]